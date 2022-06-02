/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Determines if two urls belong to the same host and matches pathname chunks
 *
 * @param {string} url1 first repo to compare
 * @param {string} url2 second repo to compare
 * @param {number} matchChunks number of pathname chunks that should match exactly
 * @returns {boolean} whether the two urls meet required criteria
 * (same hostname and match pathname chunks)
 */
export const urlsMatch = (url1, url2, matchChunks = 0) => {
  const urlObj1 = new URL(url1)
  const urlObj2 = new URL(url2)

  // check that hostname matches
  if (urlObj1.hostname !== urlObj2.hostname) {
    return false
  }

  // check that pathname chunks match
  return (
    JSON.stringify(urlObj1.pathname.split('/', matchChunks)) ===
    JSON.stringify(urlObj2.pathname.split('/', matchChunks))
  )
}
