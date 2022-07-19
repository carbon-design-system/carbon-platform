/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'

import InlineNotification from '@/components/inline-notification'

import styles from './inline-error.module.scss'

export const InlineError = () => {
  return (
    <Grid>
      <Column className={styles.column} sm={4} md={8} lg={{ start: 6, span: 8 }}>
        <InlineNotification kind="error">
          <p>something not recognized</p>
        </InlineNotification>
      </Column>
    </Grid>
  )
}

export default InlineError
