/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ListItem } from '@carbon/react'
import cx from 'classnames'

import styles from './markdown.module.scss'

const LI = ({ children, className, ...rest }) => (
  <ListItem className={cx(className, styles.listItem)} {...rest}>
    {children}
  </ListItem>
)

export default LI
