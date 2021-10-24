/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Dropdown, Toggle } from '@carbon/react';
import styles from './my-component.module.scss';

function ComponentCatalogSort({ selectedItem, initialSortOption, onChange }) {
  const options = ['hi', 'bye']

  return (
    <div className={styles.componentCatalogSortContainer}>
      <div>
        <Dropdown
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
      <div style={{backroundColor: "red"}}>
        <Dropdown
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
      <div>
      <Dropdown
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
    </div>
  );
}

export default ComponentCatalogSort;
