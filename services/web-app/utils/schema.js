/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Defines the sort order of assets by a key
 * @param {string} key
 * @returns {number} Sort order
 */
export const assetSortComparator = (key) => (assetA, assetB) => {
  const sort = key === 'status' ? 'status' : 'name'

  const valueA = assetA.content[sort] || ''
  const valueB = assetB.content[sort] || ''

  if (valueA === valueB) {
    return 0
  }
  return valueA > valueB ? 1 : -1
}

/**
 * Defines the sort order of libraries by their name.
 * @param {import('../typedefs').Library} libraryA
 * @param {import('../typedefs').Library} libraryB
 * @returns {number} Sort order
 */
export const librarySortComparator = (libraryA, libraryB) => {
  const valueA = libraryA.content.name || ''
  const valueB = libraryB.content.name || ''

  if (valueA === valueB) {
    return 0
  }
  return valueA > valueB ? 1 : -1
}
