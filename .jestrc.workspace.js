/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/*
 * This config file is used when running jest against an individual workspace. It is basically the
 * main config file with a corrected root directory.
 */
const baseConfig = require('./.jestrc.js')
/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
module.exports = {
  ...baseConfig,

  roots: undefined,

  // The root directory that Jest should scan for tests and modules within
  rootDir: process.cwd()
}
