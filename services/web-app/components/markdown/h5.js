/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'
import clsx from 'clsx'

import styles from './markdown.module.scss'

const H5 = ({ children, className, ...rest }) => {
  return (
    <Grid className={clsx(className, styles['h5-container'])} {...rest}>
      <Column sm={4} md={8} lg={8}>
        <h5 className={styles.h5}>{children}</h5>
      </Column>
    </Grid>
  )
}

export default H5
