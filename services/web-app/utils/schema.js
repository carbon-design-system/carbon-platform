/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Defines the sort order of assets by their name.
 * @param {import('../typedefs').Asset} assetA
 * @param {import('../typedefs').Asset} assetB
 * @returns {number} Sort order
 */
export const assetSortComparator = (assetA, assetB) => {
  if (assetA.content.name === assetB.content.name) {
    return 0
  }
  return assetA.content.name > assetB.content.name ? 1 : -1
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
 * Gets a display string from a schema value
 * @param {string} status - The asset schema value
 * @returns {string} The display string
 */
export const getStatus = (status) => {
  if (status === 'stable') return 'Stable'

  return 'To do'
}

export const getSponsor = (sponsor) => {
  if (sponsor === 'carbon') {
    return 'Carbon'
  } else if (sponsor === 'ibm-dotcom') {
    return 'Carbon for IBM.com'
  }
  return sponsor
}
