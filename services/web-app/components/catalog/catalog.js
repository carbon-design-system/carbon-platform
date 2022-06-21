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
import useLocalState from '@/utils/use-local-state'
import usePrevious from '@/utils/use-previous'
import useQueryState from '@/utils/use-query-state'

import styles from './catalog.module.scss'

function Catalog({
  allowMultiView = true,
  availableFilters = {},
  defaultSortIndex = 0,
  filter = {},
  itemName = '',
  itemPluralName = '',
  items = [],
  onFilter,
  onUpdateFilter,
  renderItem,
  sortOptions
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
      defaultValue: ALPHABETICAL_ORDER
    },
    (value) => {
      return (
        value &&
        typeof value === 'string' &&
        sortItems.map((sortItem) => sortItem.id).includes(value)
      )
    }
  )

  const [view, setView] = useLocalState(
    'view',
    {
      defaultValue: LIST_VIEW
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

  // using hook to store previous values of params to determine whether
  // the following useEffect should run (doing deep comparison with isEqual on filter)
  const prevValues = usePrevious({ sort, search, filter })
  useEffect(() => {
    if (
      prevValues?.sort !== sort ||
      prevValues?.search !== search ||
      !isEqual(prevValues?.filter, filter)
    ) {
      onFilter(sort, search)
    }
  }, [filter, sort, search, prevValues, onFilter])

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
    onUpdateFilter(updatedFilter)
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
      <CatalogResults resultCount={items.length} />
      <CatalogSort
        onSort={setSort}
        onView={setView}
        sortId={sort}
        view={view}
        sortOptions={sortOptions}
        defaultSortIndex={defaultSortIndex}
        allowMultiView={allowMultiView}
      />
      <CatalogList
        items={items}
        itemPluralName={itemPluralName}
        isGrid={view === GRID_VIEW}
        page={page}
        pageSize={pageSize}
        renderItem={renderItem}
      />
      <CatalogPagination
        items={items}
        page={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
      />
    </>
  )
}

Catalog.defaultProps = {
  allowMultiView: true,
  availableFilters: {},
  defaultSortIndex: 0,
  filter: {},
  itemName: '',
  itemPluralName: '',
  items: []
}

Catalog.propTypes = {
  /**
   * True if catalog elements can be rendered both as grid or list, false otherwise
   */
  allowMultiView: PropTypes.bool,
  /**
   * Object containing all keys and  name/values of possible filters
   */
  availableFilters: PropTypes.object,
  /**
   * Indicates array position of default sort strategy in sortOptions array
   */
  defaultSortIndex: PropTypes.number,
  /**
   * Object containing key/value(array) of currently applied filters
   */
  filter: PropTypes.object.isRequired,
  /**
   * singular name to describe catalog items category (e.g : "asset", "component")
   */
  itemName: PropTypes.string.isRequired,
  /**
   * plural name to describe catalog items category (e.g : "assets", "components")
   */
  itemPluralName: PropTypes.string.isRequired,
  /**
   * array of items to display (should take filter into account)
   */
  items: PropTypes.array.isRequired,
  /**
   * (sort,search) => void
   * function called when items list should be updated based on new parameters.
   * Should update the list of items passed as prop)
   */
  onFilter: PropTypes.func.isRequired,
  /**
   * (updatedFilter) => void
   * function called when filter needs to be updated (add/remove key, clear all).
   * Should update the filter object passed as prop.
   * It is not necessary to update the list of items at this time
   */
  onUpdateFilter: PropTypes.func.isRequired,
  /**
   * (item,index,isGrid) => React.node
   * function called to visually render an item. Should return a jsx object.
   */
  renderItem: PropTypes.func.isRequired,
  /**
   * Array of object options the list of items can be sorted by
   */
  sortOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string
    })
  ).isRequired
}

export default Catalog
