/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Column, Grid, Search } from '@carbon/react'

import CatalogMultiselectFilter from '@/components/catalog-multislect-filter'
import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

import styles from './catalog-search.module.scss'

const CatalogSearch = ({ search = '', onSearch, onSelect }) => {
  const isMd = useMatchMedia(mediaQueries.md)

  const handleOnBlur = (event) => {
    onSearch(event.target.value, true)
  }

  const handleOnChange = (event) => {
    onSearch(event.target.value, false)
  }

  const handleOnClear = () => {
    onSearch('', true)
  }

  return (
    <Grid className={styles.container} condensed={!isMd} narrow={isMd}>
      <Column className={styles.column} sm={3} md={4} lg={8}>
        <Search
          id="catalog-search"
          labelText="Search component index by name, keyword, or domain"
          placeholder="Component name, keyword, domain"
          value={search}
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          onClear={handleOnClear}
          size="lg"
        />
      </Column>
      <CatalogMultiselectFilter onSelect={onSelect} />
    </Grid>
  )
}

export default CatalogSearch
