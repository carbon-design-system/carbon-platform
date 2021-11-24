/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { breakpoints } from '@carbon/layout'
import { Column, Grid, Layer, MultiSelect, Search, Theme } from '@carbon/react'
import { useState } from 'react'
import useMedia from 'use-media'

import styles from './catalog-search.module.scss'

const CatalogSearch = ({ onSearch }) => {
  const [query, setQuery] = useState('')
  const isMd = useMedia({ minWidth: breakpoints.md.width })

  const handleOnChange = (event) => {
    setQuery(event.target.value)
    onSearch(event.target.value)
  }

  const items = [
    { id: 'one', text: 'One' },
    { id: 'two', text: 'Two' },
    { id: 'three', text: 'Three' }
  ]

  return (
    <Theme className={styles.container} theme="white">
      <Layer>
        <Grid condensed={!isMd} narrow={isMd}>
          <Column className={styles.column} sm={2} md={4} lg={8}>
            <Search
              id="catalog-search"
              labelText="Search component index by name, keyword, or domain"
              placeholder="Component name, keyword, domain"
              value={query}
              onChange={handleOnChange}
              size="lg"
            />
          </Column>
          <Column className={styles.column} sm={2} md={4} lg={4}>
            <MultiSelect
              id="catalog-filter"
              label="Filters"
              items={items}
              itemToString={(item) => (item ? item.text : '')}
              initialSelectedItems={[items[0], items[1]]}
              size="lg"
            />
          </Column>
        </Grid>
      </Layer>
    </Theme>
  )
}

export default CatalogSearch
