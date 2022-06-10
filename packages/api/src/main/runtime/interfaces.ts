/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
enum Environment {
  Build = 'BUILD',
  Test = 'TEST',
  Production = 'PRODUCTION'
}

enum RunMode {
  Dev = 'DEV',
  Standard = 'STANDARD'
}

export { Environment, RunMode }
