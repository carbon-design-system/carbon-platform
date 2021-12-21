/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'

import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

import styles from './catalog-page-header.module.scss'

const CatalogPageHeader = () => {
  const isMd = useMatchMedia(mediaQueries.md)

  return (
    <Grid className={styles.container} condensed={!isMd} narrow={isMd}>
      <Column className={styles.column} sm={4} md={8} lg={12}>
        <div className={styles.headerContainer}>
          <div className={styles.breadcrumb}>{'Nav Placeholder'}</div>
          <div className={styles.title}>{'Catalog Title'}</div>
          <div className={styles.icon}>{'Icon Placeholder'}</div>
        </div>
      </Column>
    </Grid>
  )
}

export default CatalogPageHeader
