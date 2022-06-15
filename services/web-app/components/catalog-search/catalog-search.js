/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Column, Grid, Search } from '@carbon/react'
import { capitalCase } from 'change-case'
import clsx from 'clsx'
import PropTypes from 'prop-types'

import CatalogMultiselectFilter from '@/components/catalog-multislect-filter'
import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

import styles from './catalog-search.module.scss'

const CatalogSearch = ({
  availableFilters = {},
  className,
  filter = {},
  itemName = '',
  onFilter,
  onSearch,
  search = ''
}) => {
  const isMd = useMatchMedia(mediaQueries.md)
  const isLg = useMatchMedia(mediaQueries.lg)

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
    <Grid className={clsx(styles.container, className)} condensed={!isLg} narrow={isLg}>
      <Column className={clsx(styles.column, styles['column-search'])} sm={4} md={4} lg={8}>
        <Search
          id="catalog-search"
          labelText={`Search ${itemName} index by name, keyword, or domain`}
          placeholder={`${capitalCase(itemName)} name, keyword, domain`}
          value={search}
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          onClear={handleOnClear}
          size="lg"
        />
        {!isMd && (
          <CatalogMultiselectFilter
            className={styles.filter}
            filter={filter}
            availableFilters={availableFilters}
            onFilter={onFilter}
          />
        )}
      </Column>
      {isMd && (
        <Column className={styles.column} md={4} lg={4}>
          <CatalogMultiselectFilter
            filter={filter}
            availableFilters={availableFilters}
            onFilter={onFilter}
          />
        </Column>
      )}
    </Grid>
  )
}

CatalogSearch.defaultProps = {
  availableFilters: {},
  filter: {},
  itemName: '',
  search: ''
}

CatalogSearch.propTypes = {
  /**
   * Object containing all keys and  name/values of possible filters
   */
  availableFilters: PropTypes.object,
  /**
   * Optional container class name.
   */
  className: PropTypes.string,
  /**
   * Object containing key/value(array) of currently applied filters
   */
  filter: PropTypes.object.isRequired,
  /**
   * singular name to describe catalog items category (e.g : "asset", "component")
   */
  itemName: PropTypes.string.isRequired,
  /**
   * (item, key, action) => void
   * function to handle filters changes (add/remove key, clear all)
   */
  onFilter: PropTypes.func.isRequired,
  /**
   * (newQuery, saveQuery) => void
   * function to handle query string changes
   */
  onSearch: PropTypes.func.isRequired,
  /**
   * current value of search query
   */
  search: PropTypes.string.isRequired
}

export default CatalogSearch
