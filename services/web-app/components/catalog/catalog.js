/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { cloneDeep, isEqual, remove, union } from 'lodash'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

import CatalogFilters from '@/components/catalog-filters'
import CatalogList from '@/components/catalog-list'
import CatalogPagination from '@/components/catalog-pagination'
import CatalogResults from '@/components/catalog-results'
import CatalogSearch from '@/components/catalog-search'
import CatalogSort from '@/components/catalog-sort'
import { ALPHABETICAL_ORDER, sortItems } from '@/data/sort'
import { GRID_VIEW, LIST_VIEW } from '@/data/view'
import usePrevious from '@/utils/use-previous'
import useQueryState from '@/utils/use-query-state'

import styles from './catalog.module.scss'

/**
 * Checks if the value of a filter property is valid. Acceptance criteria:
 * - Has a value
 * - Value is of Array type
 * - The property key is defined in `filters` object and its values are defined
 * - Each entry in the parametered `value` is contained in the list of acceptable values for the
 * key as defined in `filter`
 * @param {object} filter
 * @param {string} key
 * @param {string[]} value
 * @returns {boolean} True if value is valid
 */
const filterPropertyHasValidValue = (filter, key, value) => {
  return (
    value &&
    value.constructor === Array &&
    !!filter?.[key]?.values &&
    !value.some((val) => !Object.keys(filter[key].values).includes(val))
  )
}

function Catalog({
  items,
  filter: defaultFilter = {},
  itemPluralName = '',
  itemName = '',
  renderItem,
  availableFilters,
  allowMultiView,
  onFilter
}) {
  const [query, setQuery] = useQueryState(
    'q',
    {
      defaultValue: ''
    },
    () => true
  )

  const [search, setSearch] = useState(query)

  const [sort, setSort] = useQueryState(
    'sort',
    {
      defaultValue: ALPHABETICAL_ORDER,
      resetOnLoad: false
    },
    (value) => {
      return (
        value &&
        typeof value === 'string' &&
        sortItems.map((sortItem) => sortItem.id).includes(value)
      )
    }
  )

  const [view, setView] = useQueryState(
    'view',
    {
      defaultValue: LIST_VIEW,
      resetOnLoad: false
    },
    (value) => {
      return value && typeof value === 'string' && [GRID_VIEW, LIST_VIEW].includes(value)
    }
  )

  const [page, setPage] = useQueryState(
    'page',
    {
      defaultValue: 1,
      parseNumbers: true
    },
    (value) => !!parseInt(value)
  )

  const [pageSize, setPageSize] = useQueryState(
    'items',
    {
      defaultValue: 60,
      parseNumbers: true
    },
    (value) => !!parseInt(value)
  )

  const [framework, setFramework] = useQueryState(
    'framework',
    {
      defaultValue: defaultFilter.framework
    },
    (value) =>
      value === undefined || filterPropertyHasValidValue(availableFilters, 'framework', value)
  )

  const [platform, setPlatform] = useQueryState(
    'platform',
    {
      defaultValue: defaultFilter.platform
    },
    (value) =>
      value === undefined || filterPropertyHasValidValue(availableFilters, 'platform', value)
  )

  const [tags, setTags] = useQueryState(
    'tags',
    {
      defaultValue: defaultFilter.tags
    },
    (value) => value === undefined || filterPropertyHasValidValue(availableFilters, 'tags', value)
  )

  const [status, setStatus] = useQueryState(
    'status',
    {
      defaultValue: defaultFilter.status
    },
    (value) => value === undefined || filterPropertyHasValidValue(availableFilters, 'status', value)
  )

  const [sponsor, setSponsor] = useQueryState(
    'sponsor',
    {
      defaultValue: defaultFilter.sponsor
    },
    (value) =>
      value === undefined || filterPropertyHasValidValue(availableFilters, 'sponsor', value)
  )

  const [filter, setFilter] = useState(
    Object.fromEntries(
      Object.entries({ framework, sponsor, platform, tags, status }).filter(([_, v]) => !!v)
    )
  )

  // using hook to store previous values of params to determine whether
  // the following useEffect should run (doing deep comparison with isEqual on filter)
  const prevValues = usePrevious({ sort, search, filter })
  useEffect(() => {
    if (
      prevValues?.sort !== sort ||
      prevValues?.search !== search ||
      !isEqual(prevValues?.filter, filter)
    ) {
      onFilter(filter, sort, search)
    }
  }, [filter, sort, search, prevValues, onFilter])

  // Update the filter when each individual key/value(s) in the filter get updated
  useEffect(() => {
    const cleanFilter = Object.fromEntries(
      Object.entries({ framework, sponsor, platform, tags, status }).filter(([_, v]) => !!v)
    )

    if (!isEqual(cleanFilter, filter)) {
      setFilter(cleanFilter)
    }
  }, [framework, sponsor, platform, tags, status, filter])

  useEffect(() => {
    const resultsCount = items.length
    const maxPageNumber = Math.max(Math.ceil(resultsCount / pageSize), 1)
    if (page > maxPageNumber) {
      setPage(1)
    }
  }, [items, page, pageSize, setPage])

  const handleFilter = (item, key, action = 'add') => {
    let updatedFilter = cloneDeep(filter)

    if (action === 'add') {
      updatedFilter[item] = union(updatedFilter[item] || [], [key])
    } else if (action === 'remove') {
      if (updatedFilter[item]) {
        remove(updatedFilter[item], (k) => k === key)

        if (!updatedFilter[item].length) {
          delete updatedFilter[item]
        }
      }
    } else if (action === 'all') {
      updatedFilter = {}
    }

    if (!isEqual(updatedFilter.sponsor, filter.sponsor)) setSponsor(updatedFilter.sponsor)
    if (!isEqual(updatedFilter.platform, filter.platform)) setPlatform(updatedFilter.platform)
    if (!isEqual(updatedFilter.status, filter.status)) setStatus(updatedFilter.status)
    if (!isEqual(updatedFilter.tags, filter.tags)) setTags(updatedFilter.tags)
    if (!isEqual(updatedFilter.framework, filter.framework)) setFramework(updatedFilter.framework)
  }

  const handleSearch = (newValue, saveQuery) => {
    if (saveQuery) {
      setQuery(newValue)
    }

    setSearch(newValue)
  }

  return (
    <>
      <CatalogSearch
        className={styles.search}
        filter={filter}
        availableFilters={availableFilters}
        search={search}
        onSearch={handleSearch}
        onFilter={handleFilter}
        itemName={itemName}
      />
      <CatalogFilters filter={filter} availableFilters={availableFilters} onFilter={handleFilter} />
      <CatalogResults items={items} />
      <CatalogSort
        onSort={setSort}
        onView={setView}
        sort={sort}
        view={view}
        sortOptions={sortItems}
        allowMultiView={allowMultiView}
      />
      <CatalogList
        items={items}
        itemPluralName={itemPluralName}
        isGrid={view === GRID_VIEW}
        filter={filter}
        page={page}
        pageSize={pageSize}
        renderItem={renderItem}
      />
      <CatalogPagination
        assets={items}
        page={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
      />
    </>
  )
}

Catalog.propTypes = {
  allowMultiView: PropTypes.bool,
  availableFilters: PropTypes.object,
  filter: PropTypes.object,
  itemName: PropTypes.string.isRequired,
  itemPluralName: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  onFilter: PropTypes.func,
  renderItem: PropTypes.func
}

export default Catalog
