/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { InlineNotification } from '@carbon/react'
import { useRouter } from 'next/router'
import qs from 'querystringify'
import { useEffect, useState } from 'react'

import CatalogList from '@/components/catalog-list'
import CatalogResults from '@/components/catalog-results'
import CatalogSearch from '@/components/catalog-search'
import CatalogSort from '@/components/catalog-sort'
import { assetSortComparator, librarySortComparator } from '@/utils/schema'
import { getLocalStorageItem, setLocalStorageItem } from '@/utils/window'

import styles from './catalog.module.scss'

const DEFAULT_SORT = 'a-z'
const DEFAULT_VIEW = 'list'

function Catalog({ data, type = 'component' }) {
  const router = useRouter()
  const [, ...queryString] = router.asPath.split('?')

  /**
   * Next.js `router.query` is undefined on initial load, so parse the query string coming from
   * `router.asPath` as a fallback.
   * @type {import('../typedefs').CatalogQuery}
   */
  const query = qs.parse(queryString.join('?'))

  const [sort, setSort] = useState(
    router.query.sort ||
      query.sort ||
      getLocalStorageItem(`${router.pathname}:sort`) ||
      DEFAULT_SORT
  )
  const [view, setView] = useState(
    router.query.view ||
      query.view ||
      getLocalStorageItem(`${router.pathname}:view`) ||
      DEFAULT_VIEW
  )

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

  const handleSearch = (q) => {
    console.log('Search:', q)
  }

  /**
   * When sort state changes, save to local storage and update the page's query string if it has
   * changed without re-rendering the component. Update the rendered assets.
   */
  useEffect(() => {
    const url = `${router.pathname}${qs.stringify({ sort, view }, true)}`

    if (url !== router.asPath) {
      setLocalStorageItem(`${router.pathname}:sort`, sort)
      setLocalStorageItem(`${router.pathname}:view`, view)

      router.replace(url, undefined, { shallow: true, scroll: false })
    }

    setRenderAssets(assets.sort(assetSortComparator(sort)))
  }, [assets, router, sort, view])

  return (
    <>
      <InlineNotification className={styles.notification} kind="info" lowContrast>
        Default filters have been pre-selected based on commonly used components. If you clear
        filters to explore, you may reset them easily.
      </InlineNotification>
      <CatalogSearch onSearch={handleSearch} />
      <CatalogResults assets={renderAssets} />
      <CatalogSort onSort={setSort} onView={setView} sort={sort} view={view} />
      <CatalogList assets={renderAssets} isGrid={view === 'grid'} />
    </>
  )
}

export default Catalog
