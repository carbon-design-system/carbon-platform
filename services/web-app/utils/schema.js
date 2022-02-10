/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { get } from 'lodash'

/**
 * Defines the sort order of assets by a key
 * @param {string} key
 * @returns {number} Sort order
 */
export const assetSortComparator = (key) => (assetA, assetB) => {
  const sort = key === 'status' ? 'status' : 'name'

  if (assetA.content[sort] === assetB.content[sort]) {
    return 0
  }
  return assetA.content[sort] > assetB.content[sort] ? 1 : -1
}

/**
 * Defines the sort order of libraries by their name.
 * @param {import('../typedefs').Library} libraryA
 * @param {import('../typedefs').Library} libraryB
 * @returns {number} Sort order
 */
export const librarySortComparator = (libraryA, libraryB) => {
  if (libraryA.content.name === libraryB.content.name) {
    return 0
  }
  return libraryA.content.name > libraryB.content.name ? 1 : -1
}

/**
 * Gets the asset id
 * @param {import('../typedefs').Asset} asset
 * @returns {string} Asset id
 */
export const getAssetId = (asset) => {
  return get(asset, 'content.id')
}

/**
 * Gets the fully qualified path `library-id/asset-id` for a base library
 * @param {import('../typedefs').Asset} asset
 * @returns {string} Base library asset identifier
 */
export const getBaseIdentifier = (asset) => {
  const assetId = getAssetId(asset)
  const baseLibrary = getBaseLibraryId(asset)

  return assetId && baseLibrary ? `${baseLibrary}/${assetId}` : ''
}

/**
 * Gets the base library id if the asset is part of a group
 * @param {import('../typedefs').Asset} asset
 * @returns {string} Library id
 */
export const getBaseLibraryId = (asset) => {
  return get(asset, 'library.params.group.base', '')
}

/**
 * Gets the canonical library id if the asset is part of a group
 * @param {import('../typedefs').Asset} asset
 * @returns {string} Library id
 */
export const getCanonicalLibraryId = (asset) => {
  return get(asset, 'library.params.group.canonical', '')
}

/**
 * Determines if assets should be collapsed by framework
 * @param {import('../typedefs').Asset} asset
 * @param {Object} filter
 * @returns {boolean} If asset frameworks are collapsed
 */
export const collapseAssetGroups = (asset, filter) => {
  const canonicalLibrary = getCanonicalLibraryId(asset)

  return !filter.framework && canonicalLibrary
}
