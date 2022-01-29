/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
enum RunMode {
  Dev = 'development',
  Prod = 'production'
}

function getRunMode(): RunMode {
  const mode = process.env.NODE_ENV

  switch (mode) {
    // Normal cases
    case RunMode.Dev:
    case RunMode.Prod:
      return mode
    case undefined:
      // Not specified. Default to Dev
      return RunMode.Dev
    default:
      // Weird values result in an error
      throw new Error(`Unknown run mode: ${mode}`)
  }
}

export { getRunMode, RunMode }
