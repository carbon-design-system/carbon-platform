/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid, Layer, MultiSelect, Search, Tag, Theme } from '@carbon/react'
import { useState } from 'react'

import { useMediaQueryContext } from '@/contexts/media-query'

import styles from './catalog-search.module.scss'

const CatalogSearch = ({ onSearch, onSelect }) => {
  const [query, setQuery] = useState('')
  const { isMd } = useMediaQueryContext()

  const handleOnChange = (event) => {
    setQuery(event.target.value)
    onSearch(event.target.value)
  }

  const handleSelect = (event) => {
    const result = event.selectedItems.map(({ text }) => text)
    setSelect(result)
    onSelect(result)
  }

  const items = [
    { id: 'one', text: 'Carbon Core' },
    { id: 'two', text: 'Security' },
    { id: 'three', text: 'Stable' }
  ]

  const [select, setSelect] = useState('')

  const handleRemoveItem = (event) => {
    const updateResult = [...select]
    updateResult.splice(updateResult.indexOf(event), 1)
    setSelect(updateResult)
    onSelect(updateResult)
  }

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
              size="lg"
              onChange={handleSelect}
              value={select}
            />
          </Column>
        </Grid>
        <Grid condensed={!isMd} narrow={isMd}>
          <Column className={styles.column} sm={4} md={8} lg={12}>
            <div className={styles.textInput}>
              {select.length
                ? select.map((item, i) => (
                    <Tag
                      key={i}
                      className="some-class"
                      filter
                      onClick={() => {
                        handleRemoveItem(item)
                      }}
                    >
                      {item}
                    </Tag>
                ))
                : null}
            </div>
          </Column>
        </Grid>
      </Layer>
    </Theme>
  )
}

export default CatalogSearch
