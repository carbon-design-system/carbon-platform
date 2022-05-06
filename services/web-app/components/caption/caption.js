/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Column, Grid } from '@carbon/react'
import clsx from 'clsx'

import styles from './caption.module.scss'

/**
 * The `<Caption>` component is typically used below images or videos.
 */
const Caption = ({ children, className }) => (
  <Grid className={clsx(className, styles.container)}>
    <Column sm={4} md={6} lg={6}>
      <p className={styles.caption}>{children}</p>
    </Column>
  </Grid>
)

export default Caption
