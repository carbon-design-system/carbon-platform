/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import PropTypes from 'prop-types'
import React, { ReactNode, useContext } from 'react'

import { MdxComponent } from '../interfaces.js'
import { withPrefix } from '../utils.js'
import { TabContext } from './tabs.js'

interface TabProps {
  children: ReactNode
  index: number
  label: string
}

interface PrivateTabProps {
  _id: string
}

export const Tab: MdxComponent<TabProps & PrivateTabProps> = ({ _id, children, index }) => {
  const { activeTab } = useContext(TabContext)
  return (
    <section
      className={withPrefix('tab-panel')}
      hidden={!(activeTab === index)}
      role="tabpanel"
      id={`${_id}--panel`}
      aria-labelledby={`${_id}--tab`}
    >
      {children}
    </section>
  )
}

Tab.propTypes = {
  /** tab id */
  _id: PropTypes.string.isRequired,
  /** Provide the contents of the tab */
  children: PropTypes.node,
  /** tab index */
  index: PropTypes.number.isRequired,
  /** tab label */
  label: PropTypes.string.isRequired
}

Tab.defaultProps = {
  _id: 'none'
}

export { TabProps }
export default Tab
