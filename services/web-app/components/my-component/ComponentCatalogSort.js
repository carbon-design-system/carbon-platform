/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Button, Dropdown } from '@carbon/react'
import { SvgLeftContentSwitcher, SvgRightContentSwitcher } from '@carbon-platform/icons'

import styles from './my-component.module.scss'

function ComponentCatalogSort() {
  const options = ['hi', 'bye']

  return (
    <div className={styles.componentCatalogSortContainer}>
      <div className={styles.componentCatalogSortDropdownText}>
        <Dropdown
          id="component-index-sort"
          initialSelectedItem="Most used"
          items={options}
          light
          className={styles.componentCatalogSortDropdown}
          // onChange={({ selectedItem }) => {
          //   onChange(selectedItem);
          // }}
          type="inline"
          titleText="Sort by:"
          label="Most used"
        />
      </div>
      <div>
        <Dropdown
          className={styles.componentCatalogSortToggle}
          id="component-index-sort"
          initialSelectedItem="hola"
          items={options}
          light
          // onChange={({ selectedItem }) => {
          //   onChange(selectedItem);
          // }}
          type="inline"
          titleText="Sort by:"
          label="hello"
        />
      </div>
      <div className={styles.componentCatalogSortSwitcher}>
        <Button
          size="md"
          kind="ghost"
          renderIcon={SvgLeftContentSwitcher}
          iconDescription="Icon Description"
          hasIconOnly
        />
        <Button
          size="md"
          kind="secondary"
          renderIcon={SvgRightContentSwitcher}
          iconDescription="Icon Description"
          hasIconOnly
        />
      </div>
    </div>
  )
}

export default ComponentCatalogSort
