/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { cloneDeep, get, isArray, isEqual, remove, set, union } from 'lodash'
import minimatch from 'minimatch'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { libraryPropTypes } from 'types'

import CatalogFilters from '@/components/catalog-filters'
import CatalogList from '@/components/catalog-list'
import CatalogPagination from '@/components/catalog-pagination'
import CatalogResults from '@/components/catalog-results'
import CatalogSearch from '@/components/catalog-search'
import CatalogSort from '@/components/catalog-sort'
import { getFilters } from '@/data/filters'
import { ALPHABETICAL_ORDER, sortItems } from '@/data/sort'
import { GRID_VIEW, LIST_VIEW } from '@/data/view'
import {
  assetSortComparator,
  collapseAssetGroups,
  getBaseIdentifier,
  getCanonicalLibraryId,
  librarySortComparator
} from '@/utils/schema'
import { getSlug } from '@/utils/slug'
import usePrevious from '@/utils/use-previous'
import useQueryState from '@/utils/use-query-state'

import styles from './catalog.module.scss'

/**
 * Iterates over an array and returns true if another array has at least one value in the first
 * array. This could probably be replaced by checking the length of the Lodash `intersection()`
 * function return.
 * @param {string[]} arr1
 * @param {string[]} arr2
 * @returns {boolean}
 */
const valuesIntersect = (arr1, arr2) => {
  if (!isArray(arr1) || !isArray(arr2)) return false

  return arr1.filter((v) => arr2.includes(v)).length > 0
}

/**
 * Returns true if an asset should be included in the catalog results given the filter.
 * @param {import('../../typedefs').Asset} asset
 * @param {Object} filter
 * @returns {boolean}
 */
const assetIsInFilter = (asset, filter) => {
  for (const [key, value] of Object.entries(filter)) {
    if (key === 'sponsor') {
      if (!value.includes(asset.params[key])) return false
    } else if (key === 'tags') {
      if (!valuesIntersect(value, asset.content[key])) return false
    } else {
      if (!value.includes(asset.content[key])) return false
    }
  }

  return true
}

/**
 * Takes an array of assets and returns only id-unique assets (removes duplicate IDs)
 * @param {import('../../typedefs').Asset[]} assets list of assets to remove duplicates from
 * @returns {import('../../typedefs').Asset[]} array of unique assets
 */
const getUniqueAssetsById = (assets) => {
  return assets.filter(
    (value, index, self) => index === self.findIndex((t) => t.content.id === value.content.id)
  )
}

/**
 * Finds and returns assets that match a search criteria (name or description)
 * from an array of assets
 * @param {import('../../typedefs').Asset[]} assets list of assets to filter
 * @param {string} search search string to match assets against
 * @returns {import('../../typedefs').Asset[]} array of assets that match search criteria
 */
const filterAssetsBysearch = (assets, search) => {
  return assets.filter((asset) => {
    const { description = '', name = '' } = asset.content

    if (search) {
      return (
        (name && name.toLowerCase().includes(search.toLowerCase())) ||
        (description && description.toLowerCase().includes(search.toLowerCase()))
      )
    }

    return true
  })
}

/**
 * Sorts and filters an array of assets given a filter, sort key, and search query. Until a better
 * solution is in place, the search is simply a filter to remove assets that don't match any part of
 * the name or description.
 * @param {import('../../typedefs').Asset[]} assets list of assets to filter
 * @param {Object} filter filter object to apply to assets
 * @param {string} sort sort type to apply to assets
 * @param {string} search search string to match assets against
 * @returns {import('../../typedefs').Asset[]} array of filtered assets
 */
const getFilteredAssets = (assets, filter, sort, search) => {
  const skippedAssets = []
  const assetsWithAppliedFilter = assets
    ? [...assets].filter((asset) => {
        if (assetIsInFilter(asset, filter)) {
          if (collapseAssetGroups(asset, filter)) {
            const isCanonicalAsset = isCanonicalLibAsset(asset)
            if (!isCanonicalAsset) skippedAssets.push(asset)
            return isCanonicalAsset
          }
          return true
        } else {
          return false
        }
      })
    : []

  const assetsNotInCanonical = skippedAssets.filter(
    (asset) =>
      !assetsWithAppliedFilter.some(
        (filteredAsset) => getSlug(filteredAsset.content) === getSlug(asset.content)
      )
  )

  assetsWithAppliedFilter.push(...getUniqueAssetsById(assetsNotInCanonical))

  return filterAssetsBysearch(assetsWithAppliedFilter.sort(assetSortComparator(sort), search))
}

/**
 * Checks if the value of a filter property is valid. Acceptance criteria:
 * - Has a value
 * - Value is of Array type
 * - The property key is defined in `filters` object and its values are defined
 * - Each entry in the parametered `value` is contained in the list of acceptable values for the
 * key as defined in `filter`
 * @param {Object} filter
 * @param {string} key
 * @param {string[]} value
 * @returns {boolean} True if value is valid
 */
const filterPropertyHasValidValue = (filter, key, value) => {
  return (
    value &&
    value.constructor === Array &&
    !!filter?.[key]?.values &&
    !value.some((val) => !Object.keys(filter[key].values).includes(val))
  )
}
const isCanonicalLibAsset = (asset) =>
  get(asset, 'library.content.id') === getCanonicalLibraryId(asset)

function Catalog({ collection, data, type, filter: defaultFilter = {}, glob = {} }) {
  const [possibleFilterValues, setPossibleFilterValues] = useState(getFilters({ collection, type }))

  const [query, setQuery] = useQueryState(
    'q',
    {
      defaultValue: ''
    },
    () => true
  )

  const [search, setSearch] = useState(query)

  const [sort, setSort] = useQueryState(
    'sort',
    {
      defaultValue: ALPHABETICAL_ORDER,
      resetOnLoad: false
    },
    (value) => {
      return (
        value &&
        typeof value === 'string' &&
        sortItems.map((sortItem) => sortItem.id).includes(value)
      )
    }
  )

  const [view, setView] = useQueryState(
    'view',
    {
      defaultValue: LIST_VIEW,
      resetOnLoad: false
    },
    (value) => {
      return value && typeof value === 'string' && [GRID_VIEW, LIST_VIEW].includes(value)
    }
  )

  const [page, setPage] = useQueryState(
    'page',
    {
      defaultValue: 1,
      parseNumbers: true
    },
    (value) => !isNaN(value)
  )

  const [pageSize, setPageSize] = useQueryState(
    'items',
    {
      defaultValue: 60,
      parseNumbers: true
    },
    (value) => !isNaN(value)
  )

  const [framework, setFramework] = useQueryState(
    'framework',
    {
      defaultValue: defaultFilter.framework
    },
    (value) =>
      value === undefined || filterPropertyHasValidValue(possibleFilterValues, 'framework', value)
  )

  const [platform, setPlatform] = useQueryState(
    'platform',
    {
      defaultValue: defaultFilter.platform
    },
    (value) =>
      value === undefined || filterPropertyHasValidValue(possibleFilterValues, 'platform', value)
  )

  const [tags, setTags] = useQueryState(
    'tags',
    {
      defaultValue: defaultFilter.tags
    },
    (value) =>
      value === undefined || filterPropertyHasValidValue(possibleFilterValues, 'tags', value)
  )

  const [status, setStatus] = useQueryState(
    'status',
    {
      defaultValue: defaultFilter.status
    },
    (value) =>
      value === undefined || filterPropertyHasValidValue(possibleFilterValues, 'status', value)
  )

  const [sponsor, setSponsor] = useQueryState(
    'sponsor',
    {
      defaultValue: defaultFilter.sponsor
    },
    (value) =>
      value === undefined || filterPropertyHasValidValue(possibleFilterValues, 'sponsor', value)
  )

  const [filter, setFilter] = useState(
    Object.fromEntries(
      Object.entries({ framework, sponsor, platform, tags, status }).filter(([_, v]) => !!v)
    )
  )

  const [libraries] = useState(
    data.libraries.filter((library) => library.assets.length).sort(librarySortComparator)
  )

  const [assets] = useState(() => {
    return libraries
      .reduce((assetsArray, library) => {
        // Flatten all asset into a single array and save library data per asset
        return assetsArray.concat(
          library.assets.map((asset) => ({
            ...asset,
            library: {
              params: library.params,
              content: library.content
            }
          }))
        )
      }, [])
      .filter((asset) => {
        // Don't show noIndex assets or assets of the wrong type
        if (asset.content.noIndex || (type && asset.content.type !== type)) return false

        // Don't show libraries or assets if they don't match the glob
        if (glob.data && glob.pattern) {
          return minimatch(get(asset, glob.data), glob.pattern)
        }

        return true
      })
  })

  const [filteredAssets, setFilteredAssets] = useState(
    getFilteredAssets(assets, filter, sort, search)
  )

  const [assetCounts] = useState(() => {
    const totals = {}

    assets.forEach((asset) => {
      const baseIdentifier = getBaseIdentifier(asset)

      if (baseIdentifier) {
        set(totals, baseIdentifier, get(totals, baseIdentifier, 0) + 1)
      }
    })

    return totals
  })

  // using hook to store previous values of params to determine whether
  // the following useEffect should run (doing deep comparison with isEqual on filter)
  const prevValues = usePrevious({ sort, search, filter })
  useEffect(() => {
    if (
      prevValues?.sort !== sort ||
      prevValues?.search !== search ||
      !isEqual(prevValues?.filter, filter)
    ) {
      setFilteredAssets(getFilteredAssets(assets, filter, sort, search))
    }
  }, [assets, filter, sort, search, prevValues])

  // Update the filter when each individual key/value(s) in the filter get updated
  useEffect(() => {
    const cleanFilter = Object.fromEntries(
      Object.entries({ framework, sponsor, platform, tags, status }).filter(([_, v]) => !!v)
    )

    if (!isEqual(cleanFilter, filter)) {
      setFilter(cleanFilter)
    }
  }, [framework, sponsor, platform, tags, status, filter])

  // Update possible filter values if the collection or type changes
  useEffect(() => {
    setPossibleFilterValues(getFilters({ collection, type }))
  }, [collection, type])

  const handleFilter = (item, key, action = 'add') => {
    let updatedFilter = cloneDeep(filter)

    if (action === 'add') {
      updatedFilter[item] = union(updatedFilter[item] || [], [key])
    } else if (action === 'remove') {
      if (updatedFilter[item]) {
        remove(updatedFilter[item], (k) => k === key)

        if (!updatedFilter[item].length) {
          delete updatedFilter[item]
        }
      }
    } else if (action === 'all') {
      updatedFilter = {}
    }

    if (!isEqual(updatedFilter.sponsor, filter.sponsor)) setSponsor(updatedFilter.sponsor)
    if (!isEqual(updatedFilter.platform, filter.platform)) setPlatform(updatedFilter.platform)
    if (!isEqual(updatedFilter.status, filter.status)) setStatus(updatedFilter.status)
    if (!isEqual(updatedFilter.tags, filter.tags)) setTags(updatedFilter.tags)
    if (!isEqual(updatedFilter.framework, filter.framework)) setFramework(updatedFilter.framework)
  }

  const handleSearch = (newValue, saveQuery) => {
    if (saveQuery) {
      setQuery(newValue)
    }

    setSearch(newValue)
  }

  return (
    <>
      <CatalogSearch
        className={styles.search}
        filter={filter}
        initialFilter={{ collection, type }}
        search={search}
        onSearch={handleSearch}
        onFilter={handleFilter}
      />
      <CatalogFilters
        filter={filter}
        initialFilter={{ collection, type }}
        onFilter={handleFilter}
      />
      <CatalogResults assets={filteredAssets} />
      <CatalogSort onSort={setSort} onView={setView} sort={sort} view={view} />
      <CatalogList
        assetCounts={assetCounts}
        assets={filteredAssets}
        isGrid={view === GRID_VIEW}
        filter={filter}
        page={page}
        pageSize={pageSize}
      />
      <CatalogPagination
        assets={filteredAssets}
        page={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
      />
    </>
  )
}

Catalog.propTypes = {
  collection: PropTypes.string,
  data: PropTypes.shape({
    libraries: PropTypes.arrayOf(libraryPropTypes)
  }),
  filter: PropTypes.object,
  glob: PropTypes.object,
  type: PropTypes.string
}

export default Catalog
