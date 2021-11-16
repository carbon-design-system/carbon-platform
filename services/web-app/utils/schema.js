/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Gets a display string from a schema value
 * @param {string} status - The asset schema value
 * @returns {string} The display string
 */
export const getStatus = (status) => {
  if (status === 'stable') return 'Stable'

  return 'To do'
}
