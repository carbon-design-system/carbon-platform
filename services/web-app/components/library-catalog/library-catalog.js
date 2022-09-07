/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import isEqual from 'lodash/isEqual'
import PropTypes from 'prop-types'
import { useState } from 'react'
import slugify from 'slugify'

import Catalog from '@/components/catalog'
import { getLibraryFilters } from '@/data/filters'
import { libraryPropTypes } from '@/types'
import { librarySortComparator } from '@/utils/schema'
import { getSlug } from '@/utils/slug'
import useQueryState from '@/utils/use-query-state'

import LibraryCatalogItem from '../library-catalog-item'

/**
 * Returns true if a library should be included in the catalog results given the filter.
 * @param {import('@/typedefs').Library} library
 * @param {object} filter
 * @returns {boolean}
 */
const libraryIsInFilter = (library, filter) => {
  for (const [key, value] of Object.entries(filter)) {
    if (key === 'maintainer') {
      if (!value.includes(library.params[key])) return false
    } else if (key === 'license') {
      if (!value.includes(slugify(library.content[key], { lower: true }))) return false
    } else {
      if (!value.includes(library.content[key])) return false
    }
  }

  return true
}

/**
 * Finds and returns libraries that match a search criteria (name or description)
 * from an array of libraries
 * @param {import('@/typedefs').Library[]} libraries list of libraries to filter
 * @param {string} search search string to match libraries against
 * @returns {import('@/typedefs').Library[]} array of libraries that match search criteria
 */
const filterLibrariesBysearch = (libraries, search) => {
  return libraries.filter((library) => {
    const { description = '', name = '' } = library.content

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
 * filters an array of libraries given a filter, and search query. Until a better
 * solution is in place, the search is simply a filter to remove libraries that don't match
 * any part of the name or description.
 * @param {import('@/typedefs').Library[]} libraries list of libraries to filter
 * @param {object} filter filter object to apply to libraries
 * @param {string} search search string to match libraries against
 * @returns {import('@/typedefs').Library[]} array of filtered libraries
 */
const getFilteredLibraries = (libraries, filter, search) => {
  const librariesWithAppliedFilter = (libraries || []).filter((library) => {
    return !!libraryIsInFilter(library, filter)
  })

  return filterLibrariesBysearch(librariesWithAppliedFilter, search).sort(librarySortComparator)
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

const LibraryCatalog = ({ libraries }) => {
  const defaultFilter = {}

  const [availableFilters] = useState(getLibraryFilters())
  const [filteredLibraries, setFilteredLibraries] = useState([])

  const [license, setLicense] = useQueryState(
    'license',
    {
      defaultValue: defaultFilter.license
    },
    (value) =>
      value === undefined || filterPropertyHasValidValue(availableFilters, 'license', value)
  )

  const [maintainer, setMaintainer] = useQueryState(
    'maintainer',
    {
      defaultValue: defaultFilter.maintainer
    },
    (value) =>
      value === undefined || filterPropertyHasValidValue(availableFilters, 'maintainer', value)
  )

  const [filter, setFilter] = useState(
    Object.fromEntries(Object.entries({ license, maintainer }).filter(([_, v]) => !!v))
  )

  const filterLibraries = (_, search) => {
    setFilteredLibraries(getFilteredLibraries(libraries, filter, search))
  }

  const updateFilter = (updatedFilterVals) => {
    if (!isEqual(updatedFilterVals.maintainer, filter.maintainer)) {
      setMaintainer(updatedFilterVals.maintainer)
    }
    if (!isEqual(updatedFilterVals.license, filter.license)) {
      setLicense(updatedFilterVals.license)
    }

    const cleanFilter = Object.fromEntries(
      Object.entries(updatedFilterVals).filter(([_, v]) => !!v)
    )

    if (!isEqual(cleanFilter, filter)) {
      setFilter(cleanFilter)
    }
  }

  const renderLibrary = (library, index) => (
    <LibraryCatalogItem library={library} key={`${index}-${getSlug(library.content)}`} />
  )

  return (
    <Catalog
      items={filteredLibraries}
      filter={filter}
      renderItem={renderLibrary}
      itemPluralName="libraries"
      itemName={'library'}
      availableFilters={availableFilters}
      onFilter={filterLibraries}
      onUpdateFilter={updateFilter}
      allowMultiView={false}
    />
  )
}

export default LibraryCatalog

LibraryCatalog.propTypes = {
  /**
   * Libraries array.
   */
  libraries: PropTypes.arrayOf(libraryPropTypes).isRequired
}
