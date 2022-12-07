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
import TabItem from './tab-item.js'
import { TabContext } from './tabs.js'

interface TabListProps {
  idPrefix: string
  children: NonScalarNode
}

const TabList: MdxComponent<TabListProps> = ({ idPrefix, children }) => {
  const { activeTab, tabLabels } = useContext(TabContext)

  return (
    <ul className={withPrefix('tab-list')} role="tablist">
      {React.Children.map(children, (_, index) => {
        return (
          <TabItem
            _id={`${idPrefix}__${index}`}
            active={activeTab === index}
            index={index}
            label={tabLabels[index] || ''}
          />
        )
      })}
    </ul>
  )
}

TabList.propTypes = {
  children: PropTypes.array.isRequired,
  idPrefix: PropTypes.string.isRequired
}

export default TabList
