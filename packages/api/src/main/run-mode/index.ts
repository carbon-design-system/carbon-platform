/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
type RunMode = 'DEV' | 'PROD'

const DEV: RunMode = 'DEV'
const PROD: RunMode = 'PROD'

function getRunMode(): RunMode {
  const mode = process.env.CARBON_RUN_MODE

  switch (mode) {
    // Normal cases
    case DEV:
    case PROD:
      return mode
    // Not specified. Default to DEV
    case undefined:
      return DEV
    default:
      throw new Error(`Unknown run mode: ${mode}`)
  }
}

export type { RunMode }
export { DEV, getRunMode, PROD }
