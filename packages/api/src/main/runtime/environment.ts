/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
enum Environment {
  Test = 'TEST',
  Production = 'PRODUCTION'
}

function getEnvironment(): Environment {
  const environment = process.env.CARBON_ENVIRONMENT?.toUpperCase()

  switch (environment) {
    // Normal cases
    case Environment.Test:
    case Environment.Production:
      return environment
    case undefined:
      // Not specified. Default to Test
      return Environment.Test
    default:
      // Weird values result in an error
      throw new Error(`Unknown environment: ${environment}`)
  }
}

export { Environment, getEnvironment }
