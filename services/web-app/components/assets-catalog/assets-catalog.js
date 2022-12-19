/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import set from 'lodash/set'
import minimatch from 'minimatch'
import PropTypes from 'prop-types'
import { useCallback, useState } from 'react'

import AssetCatalogItem from '@/components/asset-catalog-item'
import Catalog from '@/components/catalog'
import { getFilters } from '@/data/filters'
import { sortItems } from '@/data/sort'
import { libraryPropTypes } from '@/types'
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
 * @param {import('@/typedefs').Asset} asset
 * @param {object} filter
 * @returns {boolean}
 */
const assetIsInFilter = (asset, filter) => {
  for (const [key, value] of Object.entries(filter)) {
    switch (key) {
      case 'maintainer':
        if (!value.includes(asset.params[key])) return false
        break
      case 'tags':
        if (!valuesIntersect(value, asset.content[key])) return false
        break
      case 'status':
        if (!value.includes(asset.statusKey)) return false
        break
      default:
        if (!value.includes(asset.content[key])) return false
    }
  }

  return true
}

/**
 * Takes an array of assets and returns only id-unique assets (removes duplicate IDs)
 * @param {import('@/typedefs').Asset[]} assets list of assets to remove duplicates from
 * @returns {import('@/typedefs').Asset[]} array of unique assets
 */
const getUniqueAssetsById = (assets) => {
  return assets.filter(
    (value, index, self) => index === self.findIndex((t) => t.content.id === value.content.id)
  )
}

/**
 * Finds and returns assets that match a search criteria (name or description)
 * from an array of assets
 * @param {import('@/typedefs').Asset[]} assets list of assets to filter
 * @param {string} search search string to match assets against
 * @returns {import('@/typedefs').Asset[]} array of assets that match search criteria
 */
const filterAssetsBySearch = (assets, search) => {
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

const isCanonicalLibAsset = (asset) => asset?.library?.content?.id === getCanonicalLibraryId(asset)

/**
 * Sorts and filters an array of assets given a filter, sort key, and search query. Until a better
 * solution is in place, the search is simply a filter to remove assets that don't match any part of
 * the name or description.
 * @param {import('@/typedefs').Asset[]} assets list of assets to filter
 * @param {object} filter filter object to apply to assets
 * @param {string} sort sort type to apply to assets
 * @param {string} search search string to match assets against
 * @returns {import('@/typedefs').Asset[]} array of filtered assets
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

  return filterAssetsBySearch(assetsWithAppliedFilter, search)
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

const AssetsCatalog = ({ collection, glob = {}, libraries, showImage, type }) => {
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

  const [maintainer, setMaintainer] = useQueryState(
    'maintainer',
    {
      defaultValue: defaultFilter.maintainer
    },
    (value) =>
      value === undefined || filterPropertyHasValidValue(availableFilters, 'maintainer', value)
  )

  const [filter, setFilter] = useState(
    Object.fromEntries(
      Object.entries({ framework, maintainer, platform, tags, status }).filter(([_, v]) => !!v)
    )
  )

  const filterAssets = useCallback(
    (sort, search) => {
      setFilteredAssets(getFilteredAssets(assets, filter, sort, search))
    },
    [assets, filter]
  )

  const updateFilter = useCallback(
    (updatedFilterVals) => {
      if (!isEqual(updatedFilterVals.maintainer, filter.maintainer)) {
        setMaintainer(updatedFilterVals.maintainer)
      }
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
    },
    [filter, setFramework, setMaintainer, setPlatform, setStatus, setTags]
  )

  const getAssetOtherFrameworkCount = useCallback(
    (asset) => {
      const baseIdentifier = getBaseIdentifier(asset)

      return collapseAssetGroups(asset, filter) ? get(groupedAssets, baseIdentifier, 0) - 1 : 0
    },
    [filter, groupedAssets]
  )

  const renderAsset = useCallback(
    (asset, index, isGrid) => (
      <AssetCatalogItem
        groupedAssets={groupedAssets}
        asset={asset}
        filter={filter}
        key={`${index}-${getSlug(asset.content)}`}
        isGrid={isGrid}
        otherFrameworkCount={getAssetOtherFrameworkCount(asset)}
        showImage={showImage}
      />
    ),
    [filter, getAssetOtherFrameworkCount, groupedAssets, showImage]
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
      allowMultiView={showImage}
    />
  )
}

export default AssetsCatalog

AssetsCatalog.defaultProps = {
  glob: {},
  showImage: true
}

AssetsCatalog.propTypes = {
  /**
   * Collection of assets to display, if any.
   */
  collection: PropTypes.oneOf(['data-visualization']),
  /**
   * Glob data to minimatch against.
   */
  glob: PropTypes.object,
  /**
   * Libraries array.
   */
  libraries: PropTypes.arrayOf(libraryPropTypes).isRequired,
  /**
   * Show image (True) or not (false)
   */
  showImage: PropTypes.bool,
  /**
   * type of catalog element.
   */
  type: PropTypes.oneOf(['component', 'element', 'function', 'pattern', 'template']).isRequired
}
