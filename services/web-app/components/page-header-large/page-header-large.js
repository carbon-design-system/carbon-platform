/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'
import clsx from 'clsx'
import PropTypes from 'prop-types'

import styles from './page-header-large.module.scss'

const PageHeaderLarge = ({ pictogram: Pictogram, title, description }) => {
  return (
    <Grid className={styles.container}>
      <Column className={styles.column} sm={4} md={6} lg={8} xlg={7}>
        <h1 className={styles.title}>{title}</h1>
      </Column>
      <Column className={styles.column} sm={4} md={6} lg={8} xlg={8}>
        <p className={styles.description}>{description}</p>
      </Column>
      {Pictogram && (
        <Column className={clsx(styles.column, styles.columnLast)} sm={0} md={2} lg={2} xlg={3}>
          <Pictogram className={styles.pictogram} />
        </Column>
      )}
    </Grid>
  )
}

PageHeaderLarge.propTypes = {
  pictogram: PropTypes.object,
  title: PropTypes.string.isRequired
}

export default PageHeaderLarge
