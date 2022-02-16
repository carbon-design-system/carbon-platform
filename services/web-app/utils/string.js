/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Removes a leading slash from a string
 * @param {string} str
 * @returns {string} A string with no leading slash
 */
export const removeLeadingSlash = (str) => {
  return str.replace(/^\/+/, '')
}

/**
 * Add a trailinsh slash to a string
 * @param {string} str
 * @returns {string} A string with a trailing slash
 */
export const addTrailingSlash = (str) => {
  return str.endsWith('/') ? str : `${str}/`
}

/**
 * checks if a given string is a valid IBM email
 * @param {string} str email to evaluate, assumes it is a valid email
 * @returns {boolean} true if string is a valid ibm email
 */
export const isValidIbmEmail = (str) => {
  const acceptableEmailSuffixes = ['.ibm.com', '@ibm.com']
  return acceptableEmailSuffixes.some((suffix) => str.endsWith(suffix))
}

/**
 * checks if a given string can be parsed to JSON
 * @param {string} str string to evaluate
 * @returns {boolean} true if string is a valid JSON
 */
export const IsJsonString = (str) => {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}
