/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'

import CatalogList from '../catalog-list'
import CatalogSearch from '../catalog-search'
import CatalogSort from '../catalog-sort'
import styles from './catalog-index-page.module.scss'

const CatalogIndexPage = ({ data, type = 'component' }) => {
  const libraries = data.libraries
    .filter((library) => library.assets.length)
    .sort((a, b) =>
      a.content.name > b.content.name ? 1 : b.content.name > a.content.name ? -1 : 0
    )

  const assets = libraries
    .reduce((assets, library) => {
      return assets.concat(library.assets)
    }, [])
    .filter((asset) => !asset.content.private && asset.content.type === type)
    .sort((a, b) =>
      a.content.name > b.content.name ? 1 : b.content.name > a.content.name ? -1 : 0
    )

  return (
    <Grid>
      <Column sm={4} md={8} lg={16} className={styles.container}>
        <CatalogSearch />
        <CatalogSort />
        <CatalogList assets={assets} />
        {/* <CatalogGrid /> */}
      </Column>
    </Grid>
  )
}

export default CatalogIndexPage
