/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'
import clsx from 'clsx'

import AutolinkHeader from '../autolink-header'
import styles from './page-not-found.module.scss'

export const PageNotFound = () => {
  return (
    <Grid>
      <Column className={styles.column} sm={4} md={8} lg={6}>
        <Grid className={clsx(styles.header, styles['h1-container'])}>
          <Column sm={4} md={8} lg={8}>
            <AutolinkHeader is="h1" className={clsx(styles.h1, styles.title)}>
              Page not found.
            </AutolinkHeader>
          </Column>
        </Grid>
      </Column>
    </Grid>
  )
}

export default PageNotFound
