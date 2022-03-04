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
import {
  assetSortComparator,
  collapseAssetGroups,
  getBaseIdentifier,
  getCanonicalLibraryId,
  librarySortComparator
} from '@/utils/schema'
import useQueryState from '@/utils/use-query-state'

import styles from './catalog.module.scss'

const valuesIntersect = (arr1, arr2) => {
  if (!isArray(arr1) || !isArray(arr2)) return false

  return arr1.filter((v) => arr2.includes(v)).length
}

const assetIsInFilter = (asset, filter) => {
  for (const [key, value] of Object.entries(filter)) {
    if (key === 'sponsor') {
      if (!value.includes(asset.params[key])) return false
    } else if (key === 'tags' && !valuesIntersect(value, asset.content[key])) {
      return false
    } else {
      if (!value.includes(asset.content[key])) return false
    }
  }

  if (collapseAssetGroups(asset, filter)) {
    return get(asset, 'library.content.id') === getCanonicalLibraryId(asset)
  }

  return true
}

function Catalog({ collection, data, type, filter: defaultFilter = {}, glob = {} }) {
  const [possibleFilterValues, setPossibleFilterValues] = useState(getFilters({ collection, type }))

  const getFilteredAssets = () => {
    return (
      assets
        ?.sort(assetSortComparator(sort))
        .filter((asset) => assetIsInFilter(asset, filter))
        .filter((asset) => {
          const { description = '', name = '' } = asset.content

          if (search) {
            return (
              (name && name.toLowerCase().includes(search.toLowerCase())) ||
              (description && description.toLowerCase().includes(search.toLowerCase()))
            )
          }

          return true
        }) ?? []
    )
  }

  /**
   * checks if the value of a filter property is valid
   * acceptable criteria
   * - Has a value
   * - Value is of Array type
   * - The property key is defined in `possibleFilterValues` object and it's values are defined
   * - Each entry in the parametered `value` is contained in the list
   *  of acceptable values for the propertyKey as defined in `possibleFilterValues`
   *
   * @param {string} propertyKey
   * @param {string[]} value value to be evaluated
   * @returns {boolean} true if value is valid
   */
  const filterPropertyHasValidValue = (propertyKey, value) => {
    return (
      !!value &&
      value.constructor === Array &&
      !!possibleFilterValues?.[propertyKey]?.values &&
      !value.some((val) => !Object.keys(possibleFilterValues[propertyKey].values).includes(val))
    )
  }

  const [query, setQuery] = useQueryState(
    'q',
    {
      defaultValue: ''
    },
    (value) => !!value
  )

  const [search, setSearch] = useState(query)

  const [sort, setSort] = useQueryState(
    'sort',
    {
      defaultValue: 'a-z',
      saveToStorage: true
    },
    (value) => {
      return !!value && typeof value === 'string' && ['a-z', 'status'].includes(value)
    }
  )

  const [view, setView] = useQueryState(
    'view',
    {
      defaultValue: 'list',
      saveToStorage: true
    },
    (value) => {
      return !!value && typeof value === 'string' && ['grid', 'list'].includes(value)
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
    (value) => filterPropertyHasValidValue('framework', value)
  )

  const [platform, setPlatform] = useQueryState(
    'platform',
    {
      defaultValue: defaultFilter.platform
    },
    (value) => filterPropertyHasValidValue('platform', value)
  )

  const [tags, setTags] = useQueryState(
    'tags',
    {
      defaultValue: defaultFilter.tags
    },
    (value) => filterPropertyHasValidValue('tags', value)
  )

  const [status, setStatus] = useQueryState(
    'status',
    {
      defaultValue: defaultFilter.status
    },
    (value) => filterPropertyHasValidValue('status', value)
  )

  const [sponsor, setSponsor] = useQueryState(
    'sponsor',
    {
      defaultValue: defaultFilter.sponsor
    },
    (value) => filterPropertyHasValidValue('sponsor', value)
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
        // flatten all asset into a single array and save library data per asset
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
        // don't show noIndex assets or assets of the wrong type
        if (asset.content.noIndex || (type && asset.content.type !== type)) return false

        // don't show libraries or assets if they don't match the glob
        if (glob.data && glob.pattern) {
          return minimatch(get(asset, glob.data), glob.pattern)
        }

        return true
      })
  })

  const [filteredAssets, setFilteredAssets] = useState(getFilteredAssets())

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

  useEffect(() => {
    setFilteredAssets(getFilteredAssets())
    // avoid deep object equality comparison in the effect by using JSON.stringify
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assets, JSON.stringify(filter), sort, search])

  useEffect(() => {
    const cleanFilter = Object.fromEntries(
      Object.entries({ framework, sponsor, platform, tags, status }).filter(([_, v]) => !!v)
    )
    if (!isEqual(cleanFilter, filter)) {
      setFilter(cleanFilter)
    }
  }, [framework, sponsor, platform, tags, status, filter])

  useEffect(() => {
    setPossibleFilterValues(getFilters({ collection, type }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collection, type])

  const updateQueryValues = (newFilter) => {
    if (!isEqual(newFilter.sponsor, filter.sponsor)) setSponsor(newFilter.sponsor)
    if (!isEqual(newFilter.platform, filter.platform)) setPlatform(newFilter.platform)
    if (!isEqual(newFilter.status, filter.status)) setStatus(newFilter.status)
    if (!isEqual(newFilter.tags, filter.tags)) setTags(newFilter.tags)
    if (!isEqual(newFilter.framework, filter.framework)) setFramework(newFilter.framework)
  }

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

    updateQueryValues(updatedFilter)
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
        isGrid={view === 'grid'}
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
