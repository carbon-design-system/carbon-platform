/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
function isDebugEnabled(): boolean | undefined {
  const mode = process.env.CARBON_DEBUG

  switch (mode) {
    case 'true':
      return true
    case 'false':
      return false
    default:
      return undefined
  }
}

export { isDebugEnabled }
