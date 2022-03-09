/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const config = {
  ...require('prettier-config-carbon'),
  bracketSameLine: false,
  printWidth: 100,
  semi: false,
  trailingComma: 'none'
}

// Delete deprecated option from upstream config
delete config.jsxBracketSameLine

module.exports = config
