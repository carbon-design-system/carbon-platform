/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
type Mode = 'DEV' | 'TEST' | 'PRODUCTION'

function getRunMode(): Mode {
  const mode = process.env.CARBON_RUN_MODE

  if (mode === 'TEST' || mode === 'PRODUCTION') {
    return mode
  } else {
    return 'DEV'
  }
}

export type { Mode }
export { getRunMode }
