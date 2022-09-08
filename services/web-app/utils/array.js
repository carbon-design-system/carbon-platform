/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Iterates over an array and returns true if another array has at least one value in the first
 * array. This could probably be replaced by checking the length of the Lodash `intersection()`
 * function return.
 * @param {string[]} arr1
 * @param {string[]} arr2
 * @returns {boolean}
 */
export const valuesIntersect = (arr1, arr2) => {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) return false

  return arr1.filter((v) => arr2.includes(v)).length > 0
}
