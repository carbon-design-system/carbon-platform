/*
 * Copyright IBM Corp. 2022, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getRunMode, PRODUCTION } from '../run-mode'

/**
 * Validates all necessary environment variables and throws error if necessary
 *
 * @param {string[]} requiredVars array of required env vars
 * @param {boolean} throwError whether an error should be thrown if
 * nvironment variables havent been properly configured
 * @returns {boolean} indicates if current environment variables are valid according
 * to supplied requiredVars object
 */
const enforceEnvVars = (requiredVars: string[], throwError = true): boolean => {
  let isValid = true
  // TODO: make this run-mode compliant when new version is merged in
  if (getRunMode() === PRODUCTION) {
    requiredVars.forEach((envVar) => {
      try {
        getEnvVar(envVar)
      } catch (err) {
        if (throwError) throw err
        isValid = false
      }
    })
  }
  return isValid
}

/**
 * Retrieves environment variable value and defaults to fallback if provided (only on DEV mode)
 *
 * @param {string} varName name of env variable
 * @param {string?} fallbackValue optional value to return if env var is not set on DEV mode
 * @returns {string} value of env variable or supplied fallback value
 */
const getEnvVar = (varName: string, fallbackValue?: string): string => {
  const value = process.env[varName]
  if (!value && (!fallbackValue || getRunMode() === PRODUCTION)) {
    throw new Error(`${varName} is not exported as an environment variable`)
  }
  return value || (fallbackValue as string)
}

export { enforceEnvVars, getEnvVar }
