/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'
import { H1 } from '@carbon-platform/mdx-components'

import styles from './page-not-found.module.scss'

export const PageNotFound = () => {
  return (
    <Grid>
      <Column className={styles.column} sm={4} md={8} lg={6}>
        <H1 headingClassName={styles.title} className={styles['h1-container']}>
          Page not found.
        </H1>
      </Column>
    </Grid>
  )
}

export default PageNotFound
