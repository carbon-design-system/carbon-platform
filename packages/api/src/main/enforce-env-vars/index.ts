/*
 * Copyright IBM Corp. 2022, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getRunMode } from '../run-mode'

interface RequiredEnvVars {
  ALL?: string[]
  DEV?: string[]
  PRODUCTION?: string[]
  TEST?: string[]
}
/**
 * Validates all necessary environment variables and throws error if necessary
 *
 * @param {RequiredEnvVars} requiredVars Object specifying required env vars by run mode
 * @param {boolean} throwError whether an error should be thrown if
 * nvironment variables havent been properly configured
 * @returns {boolean} indicates if current environment variables are valid according
 * to supplied requiredVars object
 */
export const enforceEnvVars = (requiredVars: RequiredEnvVars, throwError = true): boolean => {
  let isValid = true
  requiredVars[getRunMode()]?.forEach((param) => {
    if (!process.env[param]) {
      if (throwError) {
        throw new Error(`${param} must be exported as an environment variable or in the .env file`)
      }
      isValid = false
    }
  })
  requiredVars.ALL?.forEach((param) => {
    if (!process.env[param]) {
      if (throwError) {
        throw new Error(`${param} must be exported as an environment variable or in the .env file`)
      }
      isValid = false
    }
  })
  return isValid
}
