/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid, InlineNotification } from '@carbon/react'
import { useState } from 'react'

import CatalogSearch from '../catalog-search'
import CatalogSort from '../catalog-sort/catalog-sort'
import styles from '../catalog-sort/catalog-sort.module.scss'

function CatalogIndexPage({ data, type = 'component', onChange }) {
  const sortOptions = ['A to Z', 'Most Used']
  const initialSortOption = 'A to Z'
  const sortBy = {
    'A to Z': sortByName,
    'Most Used': sortByMostUsed
  }
  const [activeSortOption, setActiveSortOption] = useState(initialSortOption)
  const [selected, setSelected] = useState([])

  const libraries = data.libraries
    .filter((library) => library.assets.length)
    .sort((a, b) =>
      a.content.name > b.content.name ? 1 : b.content.name > a.content.name ? -1 : 0
    )

  const assets = libraries
    .reduce((assets, library) => {
      return assets.concat(library.assets)
    }, [])
    .filter((asset) => asset.content.type === type)
    .sort((a, b) =>
      a.content.name > b.content.name ? 1 : b.content.name > a.content.name ? -1 : 0
    )
  console.log(assets, 'assets here')

  function sortByName(a, b) {
    return a.name.localeCompare(b.name)
  }

  function sortByMostUsed() {
    const sorted = assets.sort((a, b) => (a.response.size > b.response.size) ? 1 : ((b.response.size > a.response.size) ? -1 : 0))
    return sorted && console.log(sorted, 'sorted')
  }

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
          onChange={sortByMostUsed}
          options={sortOptions}
          assets={assets}
        />
      </Column>
    </Grid>
  )
}

export default CatalogIndexPage
