/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { InlineNotification } from '@carbon/react'
import { useState } from 'react'

import CatalogList from '@/components/catalog-list'
import CatalogResults from '@/components/catalog-results'
import CatalogSearch from '@/components/catalog-search'
import CatalogSort from '@/components/catalog-sort'
import { assetSortComparator, librarySortComparator } from '@/utils/schema'

import styles from './catalog.module.scss'

function Catalog({ data, type = 'component' }) {
  const [sort] = useState('A–Z')
  const [view, setView] = useState('list')

  const libraries = data.libraries
    .filter((library) => library.assets.length)
    .sort(librarySortComparator)

  const assets = libraries
    .reduce((allAssets, library) => {
      return allAssets.concat(library.assets)
    }, [])
    .filter((asset) => !asset.content.private && asset.content.type === type)
    .sort(assetSortComparator)

  const handleSearch = (query) => {
    console.log('Search:', query)
  }

  const handleSort = (option) => {
    console.log('Sort:', option)
  }

  return (
    <>
      <InlineNotification className={styles.notification} kind="info" lowContrast>
        Default filters have been pre-selected based on commonly used components. If you clear
        filters to explore, you may reset them easily.
      </InlineNotification>
      <CatalogSearch onSearch={handleSearch} />
      <CatalogResults assets={assets} />
      <CatalogSort onSort={handleSort} onView={setView} sort={sort} view={view} />
      <CatalogList assets={assets} isGrid={view === 'grid'} />
    </>
  )
}

export default Catalog
