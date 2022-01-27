/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'
import clsx from 'clsx'

import styles from './page-header.module.scss'

const PageHeader = ({ title, pictogram: Pictogram }) => {
  return (
    <Grid className={styles.container}>
      <Column className={styles.column} sm={4} md={6} lg={10}>
        <h1 className={styles.title}>{title}</h1>
      </Column>
      {Pictogram && (
        <Column className={clsx(styles.column, styles.columnLast)} sm={0} md={2} lg={2}>
          <Pictogram className={styles.pictogram} />
        </Column>
      )}
    </Grid>
  )
}

export default PageHeader
