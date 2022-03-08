/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'
import cx from 'classnames'

import styles from './markdown.module.scss'

const P = ({ children, className, ...rest }) => {
  return (
    <Grid className={cx(className, styles.paragraphContainer)} {...rest}>
      <Column sm={4} md={6} lg={8}>
        <p className={styles.paragraph}>{children}</p>
      </Column>
    </Grid>
  )
}

export default P
