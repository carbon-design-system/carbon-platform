/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CodeSnippet, Column, Grid, Theme } from '@carbon/react'

import styles from './code.module.scss'

const Code = ({ children }) => (
  <Theme theme={'g100'}>
    <Grid>
      <Column sm={4} md={8} lg={8}>
        <CodeSnippet type="multi" wrapText="true" feedback="Copied!" className={styles.code}>
          {children}
        </CodeSnippet>
      </Column>
    </Grid>
  </Theme>
)

export default Code
