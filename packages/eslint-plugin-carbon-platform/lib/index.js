/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict'

module.exports.rules = {
  'no-internal-imports': require('./rules/no-internal-imports'),
  'no-test-exports': require('./rules/no-test-exports'),
  'self-isolated-packages': require('./rules/self-isolated-packages')
}
