/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
module.exports = {
  extends: ['plugin:eslint-plugin/recommended'],
  env: {
    node: true
  },
  overrides: [
    {
      files: ['packages/eslint-plugin-carbon-platform/tests/**/*.js'],
      env: { mocha: true }
    }
  ]
}
