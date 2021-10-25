/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Button, Dropdown, Toggle } from '@carbon/react';
import { LeftContentSwitcher } from "@/icons/index.js";
import styles from './my-component.module.scss';

function ComponentCatalogSort({ selectedItem, initialSortOption, onChange }) {
  const options = ['hi', 'bye']

  return (
    <div className={styles.componentCatalogSortContainer}>
      <div>
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
          label='Most used'
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
            label='hello'
          />
      </div>
      <div className={styles.componentCatalogSortSwitcher}>
        <Button size="small" kind="ghost" renderIcon={LeftContentSwitcher} iconDescription="Icon Description" hasIconOnly />
        <Button size="small" kind="ghost" renderIcon={LeftContentSwitcher} iconDescription="Icon Description" hasIconOnly />
      </div> 
    </div>
  );
}

export default ComponentCatalogSort;
