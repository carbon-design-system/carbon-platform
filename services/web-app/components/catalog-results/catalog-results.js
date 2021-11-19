/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { breakpoints } from '@carbon/layout'
import { Column, Grid } from '@carbon/react'
import useMedia from 'use-media'

import styles from './catalog-results.module.scss'

const CatalogResults = ({ assets = [] }) => {
  const isMobile = useMedia({ maxWidth: breakpoints.md.width })

  return (
    <Grid className={styles.container} condensed={isMobile} narrow={!isMobile}>
      <Column sm={4} md={8} lg={12} max={11}>
        <div className={styles.results}>{assets.length} results</div>
      </Column>
    </Grid>
  )
}

export default CatalogResults
