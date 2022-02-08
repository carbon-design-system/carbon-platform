/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { get, remove, union } from 'lodash'
import minimatch from 'minimatch'
import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import { libraryPropTypes } from 'types'

import CatalogFilters from '@/components/catalog-filters'
import CatalogList from '@/components/catalog-list'
import CatalogPagination from '@/components/catalog-pagination'
import CatalogResults from '@/components/catalog-results'
import CatalogSearch from '@/components/catalog-search'
import CatalogSort from '@/components/catalog-sort'
import { assetSortComparator, librarySortComparator } from '@/utils/schema'
import { queryTypes, useQueryState } from '@/utils/use-query-state'

import styles from './catalog.module.scss'

const FRAMEWORK = 'react'

const assetIsInFilter = (asset, filter) => {
  for (const [key, value] of Object.entries(filter)) {
    if (key === 'sponsor') {
      if (!value.includes(asset.params[key])) return false
    } else {
      if (!value.includes(asset.content[key])) return false
    }
  }

  return true
}

function Catalog({ data, type, filter: defaultFilter = {}, glob = {} }) {
  const [query, setQuery] = useQueryState('q', {
    defaultValue: ''
  })

  const [search, setSearch] = useState(query)

  const [sort, setSort] = useQueryState('sort', {
    defaultValue: 'a-z',
    saveToStorage: true
  })

  const [view, setView] = useQueryState('view', {
    defaultValue: 'list',
    saveToStorage: true
  })

  const [page, setPage] = useQueryState('page', {
    ...queryTypes.integer,
    defaultValue: 1
  })

  const [pageSize, setPageSize] = useQueryState('items', {
    ...queryTypes.integer,
    defaultValue: 60
  })

  const [filter, setFilter] = useQueryState('filter', {
    ...queryTypes.object,
    defaultValue: defaultFilter
  })

  const framework = useRef(FRAMEWORK)

  const [libraries] = useState(
    data.libraries.filter((library) => library.assets.length).sort(librarySortComparator)
  )

  const [initialAssets] = useState(
    libraries.reduce((allAssets, library) => {
      return allAssets.concat(
        library.assets.map((asset) => ({
          ...asset,
          library: {
            params: library.params,
            content: library.content
          }
        }))
      )
    }, [])
  )

  const [filteredAssets, setFilteredAssets] = useState(initialAssets)
  const [assets, setAssets] = useState(filteredAssets)

  useEffect(() => {
    const prefilteredAssets = initialAssets.filter((asset) => {
      // don't show private assets or assets of the wrong type
      if (asset.content.private || (type && asset.content.type !== type)) return false

      // don't show libraries or assets match a glob
      if (glob.data && glob.pattern) {
        return minimatch(get(asset, glob.data), glob.pattern)
      }

      // don't show if the asset doesn't have one of the valid values
      return assetIsInFilter(asset, filter)
    })

    // set framework collapse key
    framework.current = get(filter, 'framework[0]', FRAMEWORK)

    // find all inherited libraries
    const inheritanceIds = prefilteredAssets
      .reduce((arr, asset) => {
        const inherits = get(asset, 'content.inherits.asset')

        arr = inherits ? [...arr, inherits] : arr
        return arr
      }, [])
      .filter((v, i, a) => a.indexOf(v) === i)

    // save inheritance totals for framework collapsing
    const inheritanceTotals = {}

    // filter out and save other frameworks
    const dedupedFrameworkAssets = prefilteredAssets.filter((asset) => {
      let inherits = get(asset, 'content.inherits.asset')
      const inheritanceRef = `${asset.params.library}@latest/${asset.content.id}`

      if (inheritanceIds.includes(inheritanceRef)) {
        inherits = inheritanceRef
      }

      if (inherits) {
        if (get(asset, 'content.framework') !== framework.current) {
          inheritanceTotals[inherits] = inheritanceTotals[inherits]
            ? inheritanceTotals[inherits] + 1
            : 1

          return false
        }
      }
      return true
    })

    // save framework counts
    setFilteredAssets(
      dedupedFrameworkAssets.map((asset) => {
        let inherits = get(asset, 'content.inherits.asset')
        const inheritanceRef = `${asset.params.library}@latest/${asset.content.id}`

        if (inheritanceIds.includes(inheritanceRef)) {
          inherits = inheritanceRef
        }

        return {
          ...asset,
          content: {
            ...asset.content,
            frameworkCount: inheritanceTotals[inherits]
          }
        }
      })
    )

    // avoid deep object equality comparison in the effect by using JSON.stringify
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [framework, initialAssets, JSON.stringify(filter), type])

  useEffect(() => {
    setAssets(
      filteredAssets.sort(assetSortComparator(sort)).filter((asset) => {
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
  }, [filteredAssets, sort, search])

  const handleFilter = (item, key, action = 'add') => {
    let updatedFilter = Object.assign({}, filter)

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

    setFilter(updatedFilter)
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
        search={search}
        onSearch={handleSearch}
        onFilter={handleFilter}
      />
      <CatalogFilters filter={filter} onFilter={handleFilter} />
      <CatalogResults assets={assets} />
      <CatalogSort onSort={setSort} onView={setView} sort={sort} view={view} />
      <CatalogList assets={assets} isGrid={view === 'grid'} page={page} pageSize={pageSize} />
      <CatalogPagination
        assets={assets}
        page={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
      />
    </>
  )
}

Catalog.propTypes = {
  data: PropTypes.shape({
    libraries: PropTypes.arrayOf(libraryPropTypes)
  }),
  filter: PropTypes.object,
  type: PropTypes.string
}

export default Catalog
