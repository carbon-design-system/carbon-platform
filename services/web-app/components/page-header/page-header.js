/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid, Theme } from '@carbon/react'
import PropTypes from 'prop-types'

import H1 from '../markdown/h1'
import styles from './page-header.module.scss'

const PageHeader = ({ bgColor, pictogram: Pictogram, title, withTabs }) => {
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
          <H1 headingClassName={styles.title}>{title}</H1>
        </Column>
        {Pictogram && <Pictogram className={styles.pictogram} />}
      </Grid>
    </Theme>
  )
}

PageHeader.propTypes = {
  bgColor: PropTypes.string,
  pictogram: PropTypes.object,
  title: PropTypes.string.isRequired,
  withTabs: PropTypes.bool
}

export default PageHeader
