/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Dropdown } from 'carbon-components-react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

import { useId } from '@/utils/use-id'
import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

import styles from './tabs.module.scss'

function elementIsNullOrString(child) {
  return !child || typeof child.type === 'string'
}

const TabContext = createContext({})

const Select = ({ children, _id }) => {
  const { setActiveTab } = useContext(TabContext)
  const items = React.Children.map(children, (child, index) => ({
    label: child.props.label,
    index
  }))
  return (
    <div className={styles.dropdownWrapper}>
      <Dropdown
        size="xl"
        onChange={({ selectedItem }) => setActiveTab(selectedItem.index)}
        initialSelectedItem={items[0]}
        label="tab selection"
        items={items}
        id={_id}
      />
    </div>
  )
}

Select.propTypes = {
  _id: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.node)
}

const TabList = ({ children, className, _id }) => {
  const { activeTab } = useContext(TabContext)
  return (
    <ul className={clsx(className, styles.tabList)} role="tablist">
      {React.Children.map(children, (child, index) => {
        if (elementIsNullOrString(child)) return child
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
  _id: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.node),
  className: PropTypes.string
}

export const Tab = ({ _id, label, active, index, tab, children }) => {
  const { setActiveTab, tabList } = useContext(TabContext)
  const buttonRef = useCallback((ref) => tabList.push(ref), [tabList])

  const onKeyDown = (e) => {
    let nextButton
    switch (e.which) {
      case 35: // end
        e.preventDefault()
        tabList[tabList.length - 1].focus()
        break
      case 36: // home
        e.preventDefault()
        tabList[0].focus()
        break
      case 37: // left
        e.preventDefault()
        nextButton = tabList[index - 1] || tabList[tabList.length - 1]
        nextButton.focus()
        break
      case 39: // right
        e.preventDefault()
        nextButton = tabList[index + 1] || tabList[0]
        nextButton.focus()
        break
      default:
    }
  }

  if (tab) {
    return (
      <li role="presentation">
        <button
          className={styles.tab}
          ref={buttonRef}
          onKeyDown={onKeyDown}
          onClick={() => setActiveTab(index)}
          onFocus={() => setActiveTab(index)}
          type="button"
          role="tab"
          id={`${_id}--tab`}
          tabIndex={!active ? '-1' : '0'}
          aria-selected={active || undefined}
        >
          {label}
        </button>
      </li>
    )
  }

  return (
    <section
      className={styles.panel}
      hidden={!active}
      role="tabpanel"
      id={`${_id}--panel`}
      aria-labelledby={`${_id}--tab`}
    >
      {children}
    </section>
  )
}

Tab.propTypes = {
  _id: PropTypes.string,
  active: PropTypes.bool,
  children: PropTypes.arrayOf(PropTypes.node),
  index: PropTypes.number,
  label: PropTypes.string,
  tab: PropTypes.bool
}

export const Tabs = (props) => {
  const tabList = useRef([])
  const [activeTab, setActiveTab] = useState(0)
  const isLg = useMatchMedia(mediaQueries.lg)
  const id = useId('tabs')

  // clear tablist when unmounted (switching between Select and TabList)
  useEffect(() => () => (tabList.current = []))

  return (
    <TabContext.Provider value={{ setActiveTab, activeTab, tabList: tabList.current }}>
      {isLg && <TabList _id={id}>{props.children}</TabList>}
      {!isLg && <Select _id={id}>{props.children}</Select>}
      {React.Children.map(props.children, (child, index) => {
        if (elementIsNullOrString(child)) return child
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
  children: PropTypes.arrayOf(PropTypes.node)
}

Tabs.displayName = 'Tabs'
