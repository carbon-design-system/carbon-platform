/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import PropTypes from 'prop-types'
import React, { createContext, useEffect, useRef, useState } from 'react'

import { MdxComponent, NonScalarNode } from '../interfaces.js'
import { mediaQueries, useId, useMatchMedia } from '../utils.js'
import Select from './select.js'
import TabList from './tab-list.js'

interface TabContextInterface {
  setActiveTab(tab: number): void
  activeTab: number
  tabList: Array<HTMLButtonElement>
}

const TabContext = createContext<TabContextInterface>({
  setActiveTab: () => undefined,
  activeTab: -1,
  tabList: []
})

interface TabsProps {
  children: NonScalarNode
}

/**
 * The `<Tabs>` and `<Tab>` components are used together to display and swap between content.
 */
const Tabs: MdxComponent<TabsProps> = ({ children }) => {
  const tabList = useRef([])
  const [activeTab, setActiveTab] = useState(0)
  const isMd = useMatchMedia(mediaQueries.md)
  const id = useId('tabs')

  // clear tablist when unmounted (switching between Select and TabList)
  useEffect(() => () => {
    tabList.current = []
  })

  return (
    <TabContext.Provider value={{ setActiveTab, activeTab, tabList: tabList.current }}>
      {isMd && <TabList _id={id}>{children}</TabList>}
      {!isMd && <Select _id={id}>{children}</Select>}
      {React.Children.map(children, (child, index) => {
        return React.cloneElement(child, {
          _id: `${id}__${index}`,
          active: activeTab === index,
          index
        })
      })}
    </TabContext.Provider>
  )
}

Tabs.propTypes = {
  /** Provide tab children */
  children: PropTypes.array.isRequired
}

Tabs.displayName = 'Tabs'

export { TabContext, TabsProps }
export default Tabs
