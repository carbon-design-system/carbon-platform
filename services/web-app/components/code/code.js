/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CodeSnippet, Column, Grid, Theme } from '@carbon/react'
import PropTypes from 'prop-types'

import styles from './code.module.scss'

const Code = ({ children }) => (
  <Theme theme={'g100'}>
    <Grid condensed>
      <Column sm={4} md={6} lg={8}>
        <CodeSnippet type="multi" wrapText feedback="Copied!" className={styles.code}>
          {children}
        </CodeSnippet>
      </Column>
    </Grid>
  </Theme>
)

Code.propTypes = {
  /** Provide the contents of Code */
  children: PropTypes.node.isRequired
}

export default Code
