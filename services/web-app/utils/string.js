/*
 * Copyright IBM Corp. 2021, 2023
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
 * checks if a given string is a valid JSON
 * @param {string} str strings to evaluate
 * @returns {boolean} true if string is a valid JSON
 */
export const isJsonString = (str) => {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

/**
 * Adds https protocol to url if no protocol present
 * @param {string} url
 * @returns {string} url with protocol
 */
export const getUrlWithProtocol = (url) => {
  if (!url) {
    throw new Error('URL must be provided')
  }

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }

  return `https://${url}`
}

/**
 * Converts string to url if valid
 * @param {string} src
 * @returns {URL | undefined}
 */
export const createUrl = (src) => {
  let result
  try {
    result = new URL(src)
  } catch {}

  return result
}
