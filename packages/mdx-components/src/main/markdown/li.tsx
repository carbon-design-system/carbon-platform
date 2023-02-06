/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ListItem } from '@carbon/react'
import { clsx } from 'clsx'
import PropTypes from 'prop-types'
import React, { ReactNode } from 'react'

import { MdxComponent } from '../interfaces.js'
import { withPrefix } from '../utils.js'
const { Provider, Consumer: LiConsumer } = React.createContext<LiContext>({
  hasListItemParent: false
})

interface LiProps {
  children: ReactNode
}

interface LiContext {
  hasListItemParent: boolean
}

const LI: MdxComponent<LiProps> = ({ children }) => (
  <ListItem className={clsx(withPrefix('list-item'))}>
    <Provider value={{ hasListItemParent: true }}>{children}</Provider>
  </ListItem>
)

LI.propTypes = {
  /**
   * String title for Header
   */
  children: PropTypes.node.isRequired
}

export { LiProps }
export default LI
export { LiConsumer }
