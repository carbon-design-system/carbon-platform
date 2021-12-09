/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { InlineNotification } from '@carbon/react'
import { useEffect, useState } from 'react'

import CatalogList from '@/components/catalog-list'
import CatalogPagination from '@/components/catalog-pagination'
import CatalogResults from '@/components/catalog-results'
import CatalogSearch from '@/components/catalog-search'
import CatalogSort from '@/components/catalog-sort'
import { assetSortComparator, librarySortComparator } from '@/utils/schema'
import { queryTypes, useQueryState } from '@/utils/use-query-state'

import styles from './catalog.module.scss'

function Catalog({ data, type = 'component' }) {
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
    defaultValue: 12
  })

  const [libraries] = useState(
    data.libraries.filter((library) => library.assets.length).sort(librarySortComparator)
  )

  const [assets] = useState(
    libraries
      .reduce((allAssets, library) => {
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
      .filter((asset) => !asset.content.private && asset.content.type === type)
  )

  const [renderAssets, setRenderAssets] = useState(assets)

  useEffect(() => {
    setRenderAssets(
      assets.sort(assetSortComparator(sort)).filter((asset) => {
        return search
          ? asset.content.name.toLowerCase().includes(search.toLowerCase()) ||
              asset.content.description.toLowerCase().includes(search.toLowerCase())
          : true
      })
    )
  }, [assets, sort, search])

  const handleSelect = (activeSelected) => {
    console.log('Selected here:', activeSelected)
  }

  const handleSearch = (newValue, saveQuery) => {
    if (saveQuery) {
      setQuery(newValue)
    }

    setSearch(newValue)
  }

  return (
    <>
      <InlineNotification className={styles.notification} kind="info" lowContrast>
        Default filters have been pre-selected based on commonly used components. If you clear
        filters to explore, you may reset them easily.
      </InlineNotification>
      <CatalogSearch search={search} onSearch={handleSearch} onSelect={handleSelect} />
      <CatalogResults assets={renderAssets} />
      <CatalogSort onSort={setSort} onView={setView} sort={sort} view={view} />
      <CatalogList assets={renderAssets} isGrid={view === 'grid'} page={page} pageSize={pageSize} />
      <CatalogPagination
        assets={renderAssets}
        page={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
      />
    </>
  )
}

export default Catalog
