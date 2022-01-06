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
