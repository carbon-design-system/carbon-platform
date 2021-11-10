/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Libraries are only included in the platform if in this allowlist. Library slugs are specified as
 * object keys to ensure uniqueness.
 */
const libraryAllowList = {
  'carbon-react': {
    host: 'github.ibm.com',
    org: 'matt-rosno',
    repo: 'carbon',
    path: '/packages/react'
  }
}

module.exports = {
  libraryAllowList
}
