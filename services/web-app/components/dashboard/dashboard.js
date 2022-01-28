/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'

import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

import styles from './dashboard.module.scss'
import DashboardItem from './dashboard-item'

const Dashboard = () => {
  const isLg = useMatchMedia(mediaQueries.lg)
  const isMd = useMatchMedia(mediaQueries.md)

  let columns = 1
  if (isMd) columns = 2
  if (isLg) columns = 3

  return (
    <Grid className={styles.container} columns={columns} condensed={!isMd} narrow={isMd}>
      <Column className={styles.column}>
        <DashboardItem
          aspectRatio={{ sm: '2x1', md: '1x1', lg: '3x4', xlg: '1x1' }}
          border={{ sm: true }}
        >
          Maintainer
        </DashboardItem>
      </Column>
      <Column className={styles.column} lg={2}>
        <DashboardItem aspectRatio={{ sm: '1x1', lg: 'none', xlg: 'none' }} border={{ sm: true }}>
          <Grid columns={2} className={styles.subgrid}>
            <Column className={styles.subcolumn}>Library</Column>
            <Column className={styles.subcolumn}>Version</Column>
            <Column className={styles.subcolumn}>License</Column>
            <Column className={styles.subcolumn}>Framework</Column>
            <Column className={styles.subcolumn}>Last modified</Column>
            <Column className={styles.subcolumn}>Design kit</Column>
          </Grid>
        </DashboardItem>
      </Column>
      <Column className={styles.column} sm={0} md={1}>
        <DashboardItem
          aspectRatio={{ md: '2x1', lg: '16x9', xlg: '2x1' }}
          border={{ sm: true, md: true, lg: true, xlg: true }}
        >
          Downloads
        </DashboardItem>
      </Column>
      <Column className={styles.column} sm={0} md={1}>
        <DashboardItem
          aspectRatio={{ md: '2x1', lg: '16x9', xlg: '2x1' }}
          border={{ sm: true, md: true, lg: true, xlg: true }}
        >
          Open issues
        </DashboardItem>
      </Column>
      <Column className={styles.column} sm={0} md={1}>
        <DashboardItem
          aspectRatio={{ md: '2x1', lg: '16x9', xlg: '2x1' }}
          border={{ sm: true, md: true, lg: true, xlg: true }}
        >
          Pull requests
        </DashboardItem>
      </Column>
      <Column className={styles.column} sm={0} md={1} lg={0}>
        <DashboardItem
          aspectRatio={{ md: '2x1', lg: '16x9', xlg: '2x1' }}
          border={{ sm: true, md: true, lg: true, xlg: true }}
          spacer
        />
      </Column>
    </Grid>
  )
}

export default Dashboard
