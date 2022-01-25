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
export const enforceEnvVars = (requiredVars: string[], throwError = true): boolean => {
  let isValid = true
  // TODO: make this run-mode compliant when new version is merged in
  if (getRunMode() === PRODUCTION) {
    requiredVars.forEach((envVar) => {
      if (!process.env[envVar]) {
        if (throwError) {
          throw new Error(`${envVar} must be exported as an environment variable`)
        }
        isValid = false
      }
    })
  }
  return isValid
}
