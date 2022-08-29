/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid, OrderedList } from '@carbon/react'
import clsx from 'clsx'

import { LiConsumer } from './li'
import styles from './markdown.module.scss'

const Ol = ({ children, className, ...rest }) => {
  return (
    <LiConsumer>
      {(value) => {
        if (value.hasListItemParent) {
          return (
            <OrderedList
              isExpressive
              className={clsx(className, styles.list, styles.ol)}
              nested
              {...rest}
            >
              {children}
            </OrderedList>
          )
        } else {
          return (
            <Grid className={styles['list-container']}>
              <Column sm={4} md={8} lg={8}>
                <OrderedList
                  isExpressive
                  className={clsx(className, styles.list, styles.ol)}
                  {...rest}
                >
                  {children}
                </OrderedList>
              </Column>
            </Grid>
          )
        }
      }}
    </LiConsumer>
  )
}

export default Ol
