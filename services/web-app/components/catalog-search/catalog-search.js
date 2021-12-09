/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid, Layer, Search, Theme } from '@carbon/react'
import { useState } from 'react'

import CatalogMultiselectFilter from '@/components/catalog-multislect-filter'
import { mediaQueries, useMatchMedia } from '@/utils/media-query'

import styles from './catalog-search.module.scss'

const CatalogSearch = ({ onSelect, onSearch }) => {
  const [query, setQuery] = useState('')
  const isMd = useMatchMedia(mediaQueries.md)

  const handleOnChange = (event) => {
    setQuery(event.target.value)
    onSearch(event.target.value)
  }

  return (
    <Theme className={styles.container} theme="white">
      <Layer>
        <Grid condensed={!isMd} narrow={isMd}>
          <Column className={styles.column} sm={3} md={4} lg={8}>
            <Search
              id="catalog-search"
              labelText="Search component index by name, keyword, or domain"
              placeholder="Component name, keyword, domain"
              value={query}
              onChange={handleOnChange}
              size="lg"
            />
          </Column>
          <CatalogMultiselectFilter onSelect={onSelect} />
        </Grid>
      </Layer>
    </Theme>
  )
}

export default CatalogSearch
