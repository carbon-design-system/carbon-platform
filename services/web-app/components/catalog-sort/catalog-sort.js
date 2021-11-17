/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Button, Dropdown, Toggle } from '@carbon/react'
import { Svg32GridLayout, Svg32ListLayout } from '@carbon-platform/icons'
import { useState } from 'react'

import CatalogGrid from '../catalog-grid'
import CatalogList from '../catalog-list'
import styles from './catalog-sort.module.scss'

const CatalogSort = ({ assets, initialSortOption, options, onChange }) => {
  const [layout, setLayout] = useState(false)
  const [listSelected, setListSelected] = useState(true)
  const [gridSelected, setGridSelected] = useState(false)

  return (
    <div>
    <div className={styles.container}>
    <div className={styles.dropdownText}>
      <Dropdown
        id="component-index-sort"
        light
        className={styles.dropdown}
        initialSelectedItem={initialSortOption}
        items={options}
        onChange={({ selectedItem }) => {
          console.log('testing here')
          onChange(selectedItem)
        }}
        type="inline"
        titleText="Sort by:"
        label="A-Z"
        size="lg"
      />
    </div>
    <div>
      <Toggle
        aria-label="toggle button"
        defaultToggled
        id="toggle-1"
        labelText="Carbon Reviewed:"
        className={styles.toggle}
        size="lg"
      />
    </div>
    <div className={styles.switcher}>
      <Button
        className={gridSelected ? styles.selected : null}
        size="lg"
        kind="ghost"
        renderIcon={Svg32GridLayout}
        iconDescription="Grid view"
        hasIconOnly
        onClick={() => {
          setLayout(true)
          setGridSelected(!gridSelected)
          setListSelected(!listSelected)
        }}
      />
      <Button
        className={listSelected ? styles.selected : null}
        size="lg"
        kind="ghost"
        renderIcon={Svg32ListLayout}
        iconDescription="List view"
        hasIconOnly
        onClick={() => {
          setLayout(false)
          setListSelected(!listSelected)
          setGridSelected(!gridSelected)
        }}
      />
    </div>
  </div>
  {layout ? <CatalogGrid assets={assets} /> : <CatalogList assets={assets} />}
  </div>
  )
}

export default CatalogSort
