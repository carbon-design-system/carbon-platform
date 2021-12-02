/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const isBrowser = typeof window !== 'undefined'

/**
 * Gets an item from local storage only if `window` exists
 * @param {string} item
 * @returns String The item from local storage
 */
export const getLocalStorageItem = (item) => {
  return isBrowser && localStorage.getItem(item)
}

/**
 * Sets an item in local storage only if `window` exists
 * @param {string} key
 * @param {string} value
 */
export const setLocalStorageItem = (key, value) => {
  if (isBrowser) {
    localStorage.setItem(key, value)
  }
}
