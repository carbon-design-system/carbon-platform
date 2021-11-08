/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Search } from '@carbon/react'
import styles from './catalog-search.module.scss'

const CatalogSearch = ({ value, onChange }) => {
  function handleOnChange(event) {
    onChange(event.target.value)
  }

  return (
    <div>
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
      <div className={styles.searchResultsPlaceholder}>123 results</div>
    </div>
  )
}

export default CatalogSearch
