/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Column, Grid, Search } from '@carbon/react'
import clsx from 'clsx'

import CatalogMultiselectFilter from '@/components/catalog-multislect-filter'
import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

import styles from './catalog-search.module.scss'

const CatalogSearch = ({ className, filter, search = '', onSearch, onFilter }) => {
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
    <Grid className={clsx(styles.container, className)} condensed={!isMd} narrow={isMd}>
      <Column className={clsx(styles.column, styles.columnSearch)} sm={4} md={4} lg={8}>
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
        {!isMd && (
          <CatalogMultiselectFilter className={styles.filter} filter={filter} onFilter={onFilter} />
        )}
      </Column>
      {isMd && (
        <Column className={styles.column} md={4} lg={4}>
          <CatalogMultiselectFilter filter={filter} onFilter={onFilter} />
        </Column>
      )}
    </Grid>
  )
}

export default CatalogSearch
