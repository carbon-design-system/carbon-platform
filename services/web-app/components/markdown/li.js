/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ListItem } from '@carbon/react'
import clsx from 'clsx'
import React from 'react'

import styles from './markdown.module.scss'
const { Provider, Consumer: LiConsumer } = React.createContext({})

const LI = ({ children, className, ...rest }) => (
  <ListItem className={clsx(className, styles['list-item'])} {...rest}>
    <Provider value={{ hasListItemParent: true }}>{children}</Provider>
  </ListItem>
)

export default LI
export { LiConsumer }
