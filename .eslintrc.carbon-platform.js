/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
module.exports = {
  plugins: ['carbon-platform'],
  rules: {
    'carbon-platform/no-internal-imports': 'error',
    'carbon-platform/no-test-exports': 'error',
    'carbon-platform/self-isolated-packages': 'error'
  }
}
