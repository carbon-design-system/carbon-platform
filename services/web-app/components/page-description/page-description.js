/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Column, Grid } from '@carbon/react'
import cx from 'classnames'

import styles from './page-description.module.scss'

const PageDescription = ({ children, className, ...rest }) => (
  <Grid>
    <Column sm={4} md={6} lg={8} className={cx(styles.pageDescription, className)} {...rest}>
      {children}
    </Column>
  </Grid>
)

export default PageDescription
