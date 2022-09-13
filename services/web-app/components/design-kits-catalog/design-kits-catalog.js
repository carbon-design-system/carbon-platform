/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { isEqual } from 'lodash'
import PropTypes from 'prop-types'
import { useState } from 'react'

import Catalog from '@/components/catalog'
import DesignKitCatalogItem from '@/components/design-kit-catalog-item'
import { getDesignKitFilters } from '@/data/filters'
import { sortItems } from '@/data/sort'
import { designKitSortComparator } from '@/utils/schema'
import { getSlug } from '@/utils/slug'
import useQueryState from '@/utils/use-query-state'

/**
 * Returns true if a designKit should be included in the catalog results given the filter.
 * @param {import('@/typedefs').DesignKit} designKit
 * @param {object} filter
 * @returns {boolean}
 */

const designKitIsInFilter = (designKit, filter) => {
  for (const [key, value] of Object.entries(filter)) {
    if (!value.includes(designKit[key])) return false
  }
  return true
}

/**
 * Finds and returns designKits that match a search criteria (name or description)
 * from an array of designKits
 * @param {import('@/typedefs').DesignKit[]} designKits list of designKits to filter
 * @param {string} search search string to match designKits against
 * @returns {import('@/typedefs').DesignKit[]} array of designKits that match search criteria
 */
const filterDesignKitsBySearch = (designKits, search) => {
  return designKits.filter((designKit) => {
    const { description = '', name = '' } = designKit

    if (search) {
      return (
        (name && name.toLowerCase().includes(search.toLowerCase())) ||
        (description && description.toLowerCase().includes(search.toLowerCase()))
      )
    }
    return true
  })
}

/**
 * Sorts and filters an array of designKits given a filter, sort key, and search query. Until a
 * better solution is in place, the search is simply a filter to remove designKits that don't
 * match any part of the name or description.
 * @param {import('@/typedefs').DesignKit[]} designKits list of designKits to filter
 * @param {object} filter filter object to apply to designKits
 * @param {string} sort sort type to apply to designKits
 * @param {string} search search string to match designKits against
 * @returns {import(@/typedefs').DesignKit[]} array of filtered designKits
 */
const getFilteredDesignKits = (designKits, filter, sort, search) => {
  const designKitsWithAppliedFilter = (designKits || []).filter((designKit) =>
    designKitIsInFilter(designKit, filter)
  )
  designKitsWithAppliedFilter.sort(designKitSortComparator(sort))

  return filterDesignKitsBySearch(designKitsWithAppliedFilter, search)
}

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

const DesignKitsCatalog = ({ designKits }) => {
  const defaultFilter = {}

  const [availableFilters] = useState(getDesignKitFilters())
  const [filteredDesignKits, setFilteredDesignKits] = useState([])
  const [indexableDesignKits] = useState(designKits.filter((designKit) => !designKit.noIndex))
  // filter keys used by the designKit catalog
  const [maintainer, setMaintainer] = useQueryState(
    'maintainer',
    {
      defaultValue: defaultFilter.maintainer
    },
    (value) =>
      value === undefined || filterPropertyHasValidValue(availableFilters, 'maintainer', value)
  )

  const [tool, setTool] = useQueryState(
    'tool',
    {
      defaultValue: defaultFilter.tool
    },
    (value) => value === undefined || filterPropertyHasValidValue(availableFilters, 'tool', value)
  )

  const [type, setType] = useQueryState(
    'type',
    {
      defaultValue: defaultFilter.type
    },
    (value) => value === undefined || filterPropertyHasValidValue(availableFilters, 'type', value)
  )

  const [status, setStatus] = useQueryState(
    'status',
    {
      defaultValue: defaultFilter.status
    },
    (value) => value === undefined || filterPropertyHasValidValue(availableFilters, 'status', value)
  )

  const [filter, setFilter] = useState(
    Object.fromEntries(Object.entries({ maintainer, tool, type, status }).filter(([_, v]) => !!v))
  )

  const filterDesignKits = (sort, search) => {
    setFilteredDesignKits(getFilteredDesignKits(indexableDesignKits, filter, sort, search))
  }

  const updateFilter = (updatedFilterVals) => {
    if (!isEqual(updatedFilterVals.maintainer, filter.maintainer)) {
      setMaintainer(updatedFilterVals.maintainer)
    }
    if (!isEqual(updatedFilterVals.tool, filter.tool)) {
      setTool(updatedFilterVals.tool)
    }
    if (!isEqual(updatedFilterVals.type, filter.type)) setType(updatedFilterVals.type)
    if (!isEqual(updatedFilterVals.status, filter.status)) setStatus(updatedFilterVals.status)

    const cleanFilter = Object.fromEntries(
      Object.entries(updatedFilterVals).filter(([_, v]) => !!v)
    )

    if (!isEqual(cleanFilter, filter)) {
      setFilter(cleanFilter)
    }
  }

  const renderDesignKit = (designKit, index) => {
    return (
      <DesignKitCatalogItem
        designKit={designKit}
        filter={filter}
        key={`${index}-${getSlug(designKit)}`}
      />
    )
  }

  return (
    <Catalog
      items={filteredDesignKits}
      filter={filter}
      renderItem={renderDesignKit}
      itemPluralName="design kits"
      itemName={'design kit'}
      availableFilters={availableFilters}
      onFilter={filterDesignKits}
      onUpdateFilter={updateFilter}
      sortOptions={sortItems}
      allowMultiView={false}
    />
  )
}

export default DesignKitsCatalog

DesignKitsCatalog.propTypes = {
  /**
   * Collection of designKits to display.
   */
  designKits: PropTypes.arrayOf(designKitPropTypes).isRequired
}
