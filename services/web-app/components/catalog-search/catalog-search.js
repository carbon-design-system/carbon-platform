/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { MultiSelect, Search } from '@carbon/react'

import styles from './catalog-search.module.scss'

const CatalogSearch = ({ assets = [], value, onChange }) => {
  function handleOnChange(event) {
    onChange(event.target.value)
  }

  const items = ['one', 'two', 'three']

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.search}>
          <Search
            id="component-index-search"
            labelText="Search component index by name, keyword, or domain"
            placeHolderText="Component name, keyword, domain"
            value={value}
            onChange={handleOnChange}
            size="md"
          />
        </div>
        <div className={styles.multiselect}>
          <MultiSelect
            label="Filters"
            // {...multiSelectProps}
            items={items}
            itemToString={(item) => (item ? item.text : '')}
            initialSelectedItems={[items[0], items[1]]}
          />
        </div>
      </div>
      <div className={styles.searchPlaceholder}>
        <Search
          id="component-index-search"
          labelText="Search component index by name, keyword, or domain"
          placeHolderText="Component name, keyword, domain"
          value={value}
          onChange={handleOnChange}
          size="md"
        />
      </div>
      <div className={styles.resultsPlaceholder}>{assets.length} results</div>
    </div>
  )
}

export default CatalogSearch
