/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid, InlineNotification } from '@carbon/react'

import { assetSortComparator, librarySortComparator } from '@/utils/schema'

import CatalogSearch from '../catalog-search'
import CatalogSort from '../catalog-sort/catalog-sort'
import styles from '../catalog-sort/catalog-sort.module.scss'

function CatalogIndexPage({ data, type = 'component' }) {
  const sortOptions = ['A to Z', 'Most Used']
  const initialSortOption = 'A to Z'

  const libraries = data.libraries
    .filter((library) => library.assets.length)
    .sort(librarySortComparator)

  const assets = libraries
    .reduce((allAssets, library) => {
      return allAssets.concat(library.assets)
    }, [])
    .filter((asset) => !asset.content.private && asset.content.type === type)
    .sort(assetSortComparator)

  return (
    <Grid>
      <Column sm={4} md={8} lg={16}>
        <InlineNotification className={styles.inlineNotification} kind="info" lowContrast>
          <div>
            {
              'Default filters have been pre-selected based on commonly used components. If you clear filters to explore, you may reset them easily.'
            }
          </div>
        </InlineNotification>
        <CatalogSearch assets={assets} />
        <CatalogSort
          initialSortOption={initialSortOption}
          // onChange={sortByMostUsed}
          options={sortOptions}
          assets={assets}
        />
      </Column>
    </Grid>
  )
}

export default CatalogIndexPage
