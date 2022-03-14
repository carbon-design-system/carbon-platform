/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid, UnorderedList } from '@carbon/react'
import cx from 'classnames'

import styles from './markdown.module.scss'

const Ul = ({ children, className, ...rest }) => {
  return (
    <Grid>
      <Column sm={4} md={6} lg={8}>
        <UnorderedList isExpressive className={cx(className, styles.list, styles.ul)} {...rest}>
          {children}
        </UnorderedList>
      </Column>
    </Grid>
  )
}

export default Ul
