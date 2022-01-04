/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
type RunMode = 'DEV' | 'TEST' | 'PRODUCTION'

const DEV: RunMode = 'DEV'
const TEST: RunMode = 'TEST'
const PRODUCTION: RunMode = 'PRODUCTION'

function getRunMode(): RunMode {
  const mode = process.env.CARBON_RUN_MODE

  if (mode === TEST || mode === PRODUCTION) {
    return mode
  } else {
    return DEV
  }
}

export type { RunMode }
export { DEV, getRunMode, PRODUCTION, TEST }
