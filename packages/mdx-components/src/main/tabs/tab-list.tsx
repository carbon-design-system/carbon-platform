/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import PropTypes from 'prop-types'
import React, { useContext } from 'react'

import { MdxComponent, NonScalarNode } from '../interfaces.js'
import { withPrefix } from '../utils.js'
import { TabContext } from './tabs.js'

interface TabListProps {
  _id: string
  children: NonScalarNode
}

const TabList: MdxComponent<TabListProps> = ({ _id, children }) => {
  const { activeTab } = useContext(TabContext)

  return (
    <ul className={withPrefix('tab-list')} role="tablist">
      {React.Children.map(children, (child, index) => {
        return React.cloneElement(child, {
          _id: `${_id}__${index}`,
          active: activeTab === index,
          index,
          tab: true
        })
      })}
    </ul>
  )
}

TabList.propTypes = {
  _id: PropTypes.string.isRequired,
  children: PropTypes.array.isRequired
}

export default TabList
