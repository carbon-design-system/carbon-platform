/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
module.exports = {
  extends: ['stylelint-config-carbon'],
  allowEmptyInput: true,
  reportNeedlessDisables: true,
  reportInvalidScopeDisables: true,
  rules: {
    'selector-pseudo-class-no-unknown': null,
    'max-nesting-depth': [
      1,
      {
        ignore: ['pseudo-classes'],
        ignoreAtRules: ['include']
      }
    ]
  }
}
