/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
enum Environment {
  Build = 'BUILD',
  Test = 'TEST',
  Production = 'PRODUCTION'
}

/**
 * Gets the current environment in which the code is running. This is based on the
 * CARBON_ENVIRONMENT environment variable and defaults to "Test".
 *
 * @returns The current environment enum value.
 */
function getEnvironment(): Environment {
  const environment = process.env.CARBON_ENVIRONMENT?.toUpperCase()

  switch (environment) {
    // Normal cases
    case Environment.Build:
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

/**
 * Returns a string that is a combination of the current environment enum and the provided input
 * string. The string is of the form "[Environment]_[input string]".
 *
 * For example: input: `hello world`; output: `PRODUCTION_hello world`
 *
 * @param input The string off of which the return value is based.
 * @returns A string that includes environment enum information.
 */
function withEnvironment(input: string): string {
  return `${getEnvironment()}_${input}`
}

export { Environment, getEnvironment, withEnvironment }
