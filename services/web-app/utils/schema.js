/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { get } from 'lodash'

import { tagsForCollection, tagsForType } from '@/data/tags'
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
 * @returns {Object}
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
  const componentTypeTags = get(tagsForType, asset?.content.type, {})

  // flatten all collections to obtain single object with all tags keys
  const allCollectionTags = Object.keys(tagsForCollection).reduce((prev, currKey) => {
    return Object.assign(prev, tagsForCollection[currKey])
  }, {})

  // object containing all possible valid tags the asset can have given it's type
  const allPossibleTags = Object.assign(componentTypeTags, allCollectionTags)

  // return array of tag names
  return tags.map((tag) => allPossibleTags[tag]?.name).filter((val) => !!val)
}
