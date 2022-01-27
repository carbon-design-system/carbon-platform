/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'

import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

import styles from './catalog-results.module.scss'

const CatalogResults = ({ assets = [] }) => {
  const isMd = useMatchMedia(mediaQueries.md)

  return (
    <Grid className={styles.container} condensed={!isMd} narrow={isMd}>
      <Column sm={4} md={8} lg={12}>
        <div className={styles.results}>{assets.length} results</div>
      </Column>
    </Grid>
  )
}

export default CatalogResults
