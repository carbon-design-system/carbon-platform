/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'

import styles from './page-header.module.scss'

const PageHeader = ({ title, pictogram: Pictogram }) => {
  console.log(Pictogram, 'hi')
  return (
    <Grid className={styles.container}>
      <Column className={styles.section} sm={4} md={5} lg={8}>
        <div className={styles.title}>{title}</div>
      </Column>
      {Pictogram && (
        <Column className={styles.pictogram} sm={0} md={5} lg={8}>
          <Pictogram />
        </Column>
      )}
    </Grid>
  )
}

export default PageHeader
