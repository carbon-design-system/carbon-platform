/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid, UnorderedList } from '@carbon/react'
import clsx from 'clsx'
import React from 'react'

import { LiConsumer } from './li'
import styles from './markdown.module.scss'

const Ul = ({ children, className, ...rest }) => {
  return (
    <LiConsumer>
      {(value) => {
        if (value.hasListItemParent) {
          return (
            <UnorderedList
              isExpressive
              className={clsx(className, styles.list, styles.ul)}
              nested
              {...rest}
            >
              {children}
            </UnorderedList>
          )
        } else {
          return (
            <Grid>
              <Column sm={4} md={6} lg={8}>
                <UnorderedList
                  isExpressive
                  className={clsx(className, styles.list, styles.ul)}
                  {...rest}
                >
                  {children}
                </UnorderedList>
              </Column>
            </Grid>
          )
        }
      }}
    </LiConsumer>
  )
}

export default Ul
