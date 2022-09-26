/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid, SkeletonText, Theme } from '@carbon/react'

import { pageHeaderPropTypes } from '@/types'

import styles from './page-header.module.scss'

const PageHeader = ({ bgColor, loading, pictogram: Pictogram, title, withTabs }) => {
  const headerHeight = withTabs ? '272px' : '320px'

  let containerStyle = {
    '--header-height': headerHeight
  }

  if (bgColor) {
    containerStyle = {
      '--header-height': headerHeight,
      '--cds-background': bgColor
    }
  }

  return (
    <Theme className={styles.container} style={containerStyle} theme={bgColor ? 'white' : 'g100'}>
      <Grid className={styles.grid}>
        <Column className={styles.column} sm={4} md={6} lg={10}>
          <div className={styles.section}>
            {loading && <SkeletonText heading width="256px" className={styles.skeleton} />}
            {!loading && <h1 className={styles.title}>{title}</h1>}
          </div>
        </Column>
        {!loading && Pictogram && <Pictogram className={styles.pictogram} />}
      </Grid>
    </Theme>
  )
}

PageHeader.propTypes = pageHeaderPropTypes

export default PageHeader
