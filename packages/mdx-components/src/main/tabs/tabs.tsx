/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import PropTypes from 'prop-types'
import React, { createContext, useEffect, useRef, useState } from 'react'

import { MdxComponent, NonScalarNode } from '../interfaces.js'
import { mediaQueries, useMatchMedia, withPrefix } from '../utils.js'
import Select from './select.js'
import TabList from './tab-list.js'

interface TabContextInterface {
  setActiveTab(tab: number): void
  activeTab: number
  tabList: Array<HTMLButtonElement>
  tabLabels: Array<string>
}

const TabContext = createContext<TabContextInterface>({
  setActiveTab: () => undefined,
  activeTab: -1,
  tabList: [],
  tabLabels: []
})

interface TabsProps {
  children: NonScalarNode
}

interface TabsPrivateProps {
  tabLabels: Array<string>
  idPrefix: string
}

/**
 * The `<Tabs>` and `<Tab>` components are used together to display and swap between content.
 */
const Tabs: MdxComponent<TabsProps & TabsPrivateProps> = ({ children, idPrefix, tabLabels }) => {
  const tabList = useRef([])
  const [activeTab, setActiveTab] = useState(0)
  const isMd = useMatchMedia(mediaQueries.md)

  idPrefix = withPrefix(idPrefix)

  // clear tablist when unmounted (switching between Select and TabList)
  useEffect(() => () => {
    tabList.current = []
  })

  return (
    <TabContext.Provider value={{ setActiveTab, activeTab, tabList: tabList.current, tabLabels }}>
      {isMd && <TabList idPrefix={idPrefix}>{children}</TabList>}
      {!isMd && <Select _id={idPrefix}>{children}</Select>}
      {children}
    </TabContext.Provider>
  )
}

Tabs.propTypes = {
  /** Provide tab children */
  children: PropTypes.array.isRequired,
  /** Provide tabs id prefix */
  idPrefix: PropTypes.string.isRequired,
  /** Provide tab labels */
  tabLabels: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
}

Tabs.displayName = 'Tabs'

export { TabContext, TabsProps }
export default Tabs
