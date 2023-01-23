/*
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { RunMode } from './interfaces.js'

function getRunMode(): RunMode {
  const mode = process.env.CARBON_RUN_MODE?.toUpperCase()

  switch (mode) {
    // Normal cases
    case RunMode.Dev:
    case RunMode.Standard:
      return mode
    case undefined:
      // Not specified. Default to Dev
      return RunMode.Dev
    default:
      // Weird values result in an error
      throw new Error(`Unknown run mode: ${mode}`)
  }
}

export { getRunMode }
