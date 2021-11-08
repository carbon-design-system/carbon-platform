/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Column, Grid } from '@carbon/react'

import CatalogGrid from '../catalog-grid/catalog-grid'
import CatalogList from '../catalog-list/catalog-list'
import CatalogSearch from '../catalog-search/catalog-search'
import CatalogSort from '../catalog-sort/catalog-sort'
import styles from './catalog-index-page.module.scss'

const CatalogIndexPage = () => {
  return (
    <Grid>
      <Column sm={4} md={8} lg={16} className={styles.container}>
        <CatalogSearch />
        <CatalogSort />
        <CatalogList />
        <CatalogGrid />
      </Column>
    </Grid>
  )
}

export default CatalogIndexPage
