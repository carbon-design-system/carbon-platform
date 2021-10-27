/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Search } from '@carbon/react'
import styles from './my-component.module.scss'

function ComponentCatalogSearch({ value, onChange }) {
  function handleOnChange(event) {
    onChange(event.target.value)
  }

  return (
    <div className={styles.componentCatalogSearch}>
      <Search
        id="component-index-search"
        labelText="Search component index by name, keyword, or domain"
        placeHolderText="Component name, keyword, domain"
        value={value}
        onChange={handleOnChange}
        size="md"
      />
    </div>
  )
}

export default ComponentCatalogSearch
