/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid, OrderedList } from '@carbon/react'
import clsx from 'clsx'

import styles from './markdown.module.scss'

const Ol = ({ children, className, ...rest }) => {
  return (
    <Grid>
      <Column sm={4} md={6} lg={8}>
        <OrderedList isExpressive className={clsx(className, styles.list, styles.ol)} {...rest}>
          {children}
        </OrderedList>
      </Column>
    </Grid>
  )
}

export default Ol
