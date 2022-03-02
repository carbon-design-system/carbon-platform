/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { cloneDeep, get, isArray, isEmpty, isEqual, remove, set, union } from 'lodash'
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
import { useQueryState } from '@/utils/use-query-state'
import useQueryUpdate from '@/utils/use-query-update'

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

  const bulkUpdateQuery = useQueryUpdate()

  const [query, setQuery] = useQueryState(
    'q',
    {
      defaultValue: ''
    },
    (value) => !!value
  )

  const [search, setSearch] = useState(query)

  const [sort, setSort] = useQueryState('sort', {
    defaultValue: 'a-z',
    saveToStorage: true
  })

  const [view, setView] = useQueryState('view', {
    defaultValue: 'list',
    saveToStorage: true
  })

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

  const [framework] = useQueryState(
    'framework',
    {
      defaultValue: defaultFilter.framework
    },
    (value) => {
      // assert framework value is an array and has valid values
      return (
        !!value &&
        value.constructor === Array &&
        !!possibleFilterValues?.framework?.values &&
        !value.some((val) => !Object.keys(possibleFilterValues.framework.values).includes(val))
      )
    }
  )

  const [platform] = useQueryState(
    'platform',
    {
      defaultValue: defaultFilter.platform
    },
    (value) => {
      // assert platform value is an array and has valid values
      return (
        !!value &&
        value.constructor === Array &&
        !!possibleFilterValues?.platform?.values &&
        !value.some((val) => !Object.keys(possibleFilterValues.platform.values).includes(val))
      )
    }
  )

  const [tags] = useQueryState(
    'tags',
    {
      defaultValue: defaultFilter.tags
    },
    (value) => {
      // assert tags value is an array and has valid values
      return (
        !!value &&
        value.constructor === Array &&
        !!possibleFilterValues?.tags?.values &&
        !value.some((val) => !Object.keys(possibleFilterValues.tags.values).includes(val))
      )
    }
  )

  const [status] = useQueryState(
    'status',
    {
      defaultValue: defaultFilter.status
    },
    (value) => {
      // assert status value is an array and has valid values
      return (
        !!value &&
        value.constructor === Array &&
        !!possibleFilterValues?.status?.values &&
        !value.some((val) => !Object.keys(possibleFilterValues.status.values).includes(val))
      )
    }
  )

  const [sponsor] = useQueryState(
    'sponsor',
    {
      defaultValue: defaultFilter.sponsor
    },
    (value) => {
      // assert sponsor value is an array and has valid values
      return (
        !!value &&
        value.constructor === Array &&
        !!possibleFilterValues?.sponsor?.values &&
        !value.some((val) => !Object.keys(possibleFilterValues.sponsor.values).includes(val))
      )
    }
  )

  const [filter, setFilter] = useState(defaultFilter)

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

  const [filteredAssets, setFilteredAssets] = useState(assets)

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
    setFilteredAssets(
      assets
        .sort(assetSortComparator(sort))
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
        })
    )

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
    const queryUpdates = {}
    if (!isEqual(newFilter.sponsor, filter.sponsor)) queryUpdates.sponsor = newFilter.sponsor
    if (!isEqual(newFilter.platform, filter.platform)) queryUpdates.platform = newFilter.platform
    if (!isEqual(newFilter.status, filter.status)) queryUpdates.status = newFilter.status
    if (!isEqual(newFilter.tags, filter.tags)) queryUpdates.tags = newFilter.tags
    if (!isEqual(newFilter.framework, filter.framework)) { queryUpdates.framework = newFilter.framework }

    if (!isEmpty(queryUpdates)) bulkUpdateQuery(queryUpdates)
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
