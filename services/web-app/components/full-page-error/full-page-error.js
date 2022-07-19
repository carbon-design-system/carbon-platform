/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'

import styles from './full-page-error.module.scss'

export const FullPageError = () => {
  return (
    <Grid>
      <Column className={styles.column} sm={4} md={8} lg={{ start: 6, span: 6 }}>
        <h1 className={styles.title}>Something’s gone wrong...</h1>
        <h2 className={styles.subtitle}>Import or export statement identified</h2>
        <p className={styles.description}>
          For security concerns, import and export statements are not allowed and should be removed.
        </p>
      </Column>
    </Grid>
  )
}

export default FullPageError
