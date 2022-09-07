/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { assetTypes } from '@/data/asset-types'
import { ORDER_BY_STATUS } from '@/data/sort'
import { assetStatusLifecycle } from '@/data/status'
import { tagsForCollection, tagsForType } from '@/data/tags'
/**
 * Defines the sort order of assets by status
 * @param {import('../typedefs').Asset} assetA
 * @param {import('../typedefs').Asset} assetB
 * @returns {number} Sort order
 */
export const statusSortComparator = (assetA, assetB) =>
  assetStatusLifecycle.indexOf(assetA.statusKey) > assetStatusLifecycle.indexOf(assetB.statusKey)
    ? 1
    : -1

/**
 * Defines the sort order of assets by a key
 * @param {string} key
 * @returns {number} Sort order
 */
export const assetSortComparator = (key) => (assetA, assetB) => {
  const sort = key === ORDER_BY_STATUS ? 'status' : 'name'

  if (assetA.content[sort] === assetB.content[sort]) {
    return 0
  } else {
    if (key === ORDER_BY_STATUS) {
      return statusSortComparator(assetA, assetB)
    } else {
      return assetA.content[sort] > assetB.content[sort] ? 1 : -1
    }
  }
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
  return asset?.content?.id
}

/**
 * Gets the asset type object. If not found, default to component.
 * @param {import('../typedefs').Asset} asset
 * @returns {object} Asset type
 */
export const getAssetType = (asset) => {
  return assetTypes[asset?.content?.type || 'undefined'] || assetTypes.component
}

/**
 * Gets the asset status string value. If not found, defaults to 'draft'.
 * @param {import('../typedefs').Asset} asset
 * @returns {string} Asset status value
 */
export const getAssetStatus = (asset) => {
  return asset.content.status?.key || asset.content.status || 'draft'
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
  return asset?.library?.params?.group?.base || ''
}

/**
 * Gets the canonical library id if the asset is part of a group
 * @param {import('../typedefs').Asset} asset
 * @returns {string} Library id
 */
export const getCanonicalLibraryId = (asset) => {
  return asset?.library?.params?.group?.canonical || ''
}

/**
 * Determines if assets should be collapsed by framework
 * @param {import('../typedefs').Asset} asset
 * @param {object} filter
 * @returns {boolean} If asset frameworks are collapsed
 */
export const collapseAssetGroups = (asset, filter) => {
  const canonicalLibrary = getCanonicalLibraryId(asset)

  return !filter.framework && canonicalLibrary
}

/**
 * Gets the license from an asset
 * @param {import('../typedefs').Asset} asset
 * @returns {string} License
 */
export const getLicense = (asset) => {
  const defaultLicense = asset.params.host === 'github.ibm.com' ? 'IBM internal' : 'No license'
  const { license = defaultLicense } = asset.library ? asset.library.content : asset.content

  return license
}

/**
 * Gets the library, ref, and asset from a string like `carbon-styles@0.0.0/accordion`
 * @param {string} str
 * @returns {object}
 */
export const getLibraryVersionAsset = (str = '') => {
  let ref = ''
  let asset = ''

  const slashIndex = str.indexOf('/')

  if (slashIndex !== -1) {
    asset = str.substring(slashIndex + 1)
    str = str.slice(0, slashIndex)
  }

  const atIndex = str.indexOf('@')

  if (atIndex !== -1) {
    ref = str.substring(atIndex + 1)
    str = str.slice(0, atIndex)
  }

  return {
    library: str,
    ref,
    asset
  }
}

/**
 * Gets an array of tag names given an asset
 * @param {import('../typedefs').Asset} asset
 * @returns {string[]} An array of tag names
 */
export const getTagsList = (asset) => {
  const tags = asset?.content?.tags ?? []

  // retrieve valid tags for asset type
  const componentTypeTags = tagsForType[asset?.content.type] || {}

  // flatten all collections to obtain single object with all tags keys
  const allCollectionTags = Object.keys(tagsForCollection).reduce((prev, currKey) => {
    return Object.assign(prev, tagsForCollection[currKey])
  }, {})

  // object containing all possible valid tags the asset can have given it's type
  const allPossibleTags = Object.assign({ ...componentTypeTags }, allCollectionTags)

  // return array of tag names
  return tags.map((tag) => allPossibleTags[tag]?.name).filter((val) => !!val)
}

/**
 * Compiles an object list of all known tags
 * @returns {object} Key/Value of all known tags
 */
export const getAllTags = () => {
  const tags = {}

  const allTypeTags = Object.keys(tagsForType).reduce((prev, currKey) => {
    return Object.assign(prev, tagsForType[currKey])
  }, {})

  const allCollectionTags = Object.keys(tagsForCollection).reduce((prev, currKey) => {
    return Object.assign(prev, tagsForCollection[currKey])
  }, {})
  Object.assign(tags, allCollectionTags)
  Object.assign(tags, allTypeTags)

  return tags
}
