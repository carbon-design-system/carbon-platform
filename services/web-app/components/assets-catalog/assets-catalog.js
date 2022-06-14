/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { get, isEqual, set } from 'lodash'
import minimatch from 'minimatch'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { libraryPropTypes } from 'types'

import AssetCatalogItem from '@/components/asset-catalog-item'
import Catalog from '@/components/catalog'
import { getFilters } from '@/data/filters'
import { sortItems } from '@/data/sort'
import { valuesIntersect } from '@/utils/array'
import {
  assetSortComparator,
  collapseAssetGroups,
  getBaseIdentifier,
  getCanonicalLibraryId,
  librarySortComparator
} from '@/utils/schema'
import { getSlug } from '@/utils/slug'
import useQueryState from '@/utils/use-query-state'

/**
 * Returns true if an asset should be included in the catalog results given the filter.
 * @param {import('../../typedefs').Asset} asset
 * @param {object} filter
 * @returns {boolean}
 */
const assetIsInFilter = (asset, filter) => {
  for (const [key, value] of Object.entries(filter)) {
    if (key === 'sponsor') {
      if (!value.includes(asset.params[key])) return false
    } else if (key === 'tags') {
      if (!valuesIntersect(value, asset.content[key])) return false
    } else {
      if (!value.includes(asset.content[key])) return false
    }
  }

  return true
}

/**
 * Takes an array of assets and returns only id-unique assets (removes duplicate IDs)
 * @param {import('../../typedefs').Asset[]} assets list of assets to remove duplicates from
 * @returns {import('../../typedefs').Asset[]} array of unique assets
 */
const getUniqueAssetsById = (assets) => {
  return assets.filter(
    (value, index, self) => index === self.findIndex((t) => t.content.id === value.content.id)
  )
}

/**
 * Finds and returns assets that match a search criteria (name or description)
 * from an array of assets
 * @param {import('../../typedefs').Asset[]} assets list of assets to filter
 * @param {string} search search string to match assets against
 * @returns {import('../../typedefs').Asset[]} array of assets that match search criteria
 */
const filterAssetsBysearch = (assets, search) => {
  return assets.filter((asset) => {
    const { description = '', name = '' } = asset.content

    if (search) {
      return (
        (name && name.toLowerCase().includes(search.toLowerCase())) ||
        (description && description.toLowerCase().includes(search.toLowerCase()))
      )
    }

    return true
  })
}

const isCanonicalLibAsset = (asset) =>
  get(asset, 'library.content.id') === getCanonicalLibraryId(asset)

/**
 * Sorts and filters an array of assets given a filter, sort key, and search query. Until a better
 * solution is in place, the search is simply a filter to remove assets that don't match any part of
 * the name or description.
 * @param {import('../../typedefs').Asset[]} assets list of assets to filter
 * @param {object} filter filter object to apply to assets
 * @param {string} sort sort type to apply to assets
 * @param {string} search search string to match assets against
 * @returns {import('../../typedefs').Asset[]} array of filtered assets
 */
const getFilteredAssets = (assets, filter, sort, search) => {
  const skippedAssets = []
  const assetsWithAppliedFilter = (assets || []).filter((asset) => {
    if (assetIsInFilter(asset, filter)) {
      if (collapseAssetGroups(asset, filter)) {
        const isCanonicalAsset = isCanonicalLibAsset(asset)
        if (!isCanonicalAsset) skippedAssets.push(asset)
        return isCanonicalAsset
      }
      return true
    } else {
      return false
    }
  })

  const assetsNotInCanonical = skippedAssets.filter(
    (asset) =>
      !assetsWithAppliedFilter.some(
        (filteredAsset) => getSlug(filteredAsset.content) === getSlug(asset.content)
      )
  )

  assetsWithAppliedFilter.push(...getUniqueAssetsById(assetsNotInCanonical))
  assetsWithAppliedFilter.sort(assetSortComparator(sort))

  return filterAssetsBysearch(assetsWithAppliedFilter, search)
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

/**
 * The `<Aside>` component is a wrapper component that adds styling to make the text display
 *  smaller than the default body text with a one column offset. It is designed to be used on
 * the side of the page within grid components. Add an aria-label for a11y.
 */
const AssetsCatalog = ({ libraries, type, collection, glob = {} }) => {
  const defaultFilter = {}

  const [availableFilters] = useState(getFilters({ collection, type }))
  const [filteredAssets, setFilteredAssets] = useState([])

  const [librariesWithAssets] = useState(
    libraries.filter((library) => library.assets.length).sort(librarySortComparator)
  )

  const [assets] = useState(() => {
    return librariesWithAssets
      .reduce((assetsArray, library) => {
        // Flatten all asset into a single array and save library data per asset
        return assetsArray.concat(
          library.assets.map((asset) => ({
            ...asset,
            library: {
              params: library.params,
              content: library.content
            }
          }))
        )
      }, [])
      .filter((asset) => {
        // Don't show noIndex assets or assets of the wrong type
        if (asset.content.noIndex || (type && asset.content.type !== type)) return false

        // Don't show libraries or assets if they don't match the glob
        if (glob.data && glob.pattern) {
          return minimatch(get(asset, glob.data), glob.pattern)
        }

        return true
      })
  })

  const [groupedAssets] = useState(() => {
    const totals = {}

    assets.forEach((asset) => {
      const baseIdentifier = getBaseIdentifier(asset)

      if (baseIdentifier) {
        set(totals, baseIdentifier, get(totals, baseIdentifier, 0) + 1)
      }
    })

    return totals
  })

  // filter keys used by the asset catalog
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

  const filterAssets = (sort, search) => {
    setFilteredAssets(getFilteredAssets(assets, filter, sort, search))
  }

  const updateFilter = (updatedFilterVals) => {
    if (!isEqual(updatedFilterVals.sponsor, filter.sponsor)) setSponsor(updatedFilterVals.sponsor)
    if (!isEqual(updatedFilterVals.platform, filter.platform)) {
      setPlatform(updatedFilterVals.platform)
    }
    if (!isEqual(updatedFilterVals.status, filter.status)) setStatus(updatedFilterVals.status)
    if (!isEqual(updatedFilterVals.tags, filter.tags)) setTags(updatedFilterVals.tags)
    if (!isEqual(updatedFilterVals.framework, filter.framework)) {
      setFramework(updatedFilterVals.framework)
    }

    const cleanFilter = Object.fromEntries(
      Object.entries(updatedFilterVals).filter(([_, v]) => !!v)
    )

    if (!isEqual(cleanFilter, filter)) {
      setFilter(cleanFilter)
    }
  }

  const renderAsset = (asset, index, isGrid) => (
    <AssetCatalogItem
      groupedAssets={groupedAssets}
      asset={asset}
      filter={filter}
      key={`${index}-${getSlug(asset.content)}`}
      isGrid={isGrid}
    />
  )

  return (
    <Catalog
      items={filteredAssets}
      filter={filter}
      renderItem={renderAsset}
      itemPluralName="assets"
      itemName={type ?? 'component'}
      availableFilters={availableFilters}
      onFilter={filterAssets}
      onUpdateFilter={updateFilter}
      sortOptions={sortItems}
    />
  )
}

export default AssetsCatalog

AssetsCatalog.defaultsProps = {
  glob: {}
}

AssetsCatalog.propTypes = {
  collection: PropTypes.string,
  glob: PropTypes.object,
  /**
   * Libraries array.
   */
  libraries: PropTypes.arrayOf(libraryPropTypes).isRequired,

  /**
   * type of catalog element.
   */
  type: PropTypes.oneOf(['element', 'function', 'pattern', 'template']).isRequired
}
