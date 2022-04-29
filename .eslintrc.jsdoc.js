/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
module.exports = {
  plugins: ['jsdoc'],
  settings: {
    jsdoc: {
      tagNamePreference: {
        augments: 'extends'
      }
    }
  },
  rules: {
    'jsdoc/check-param-names': 'error',
    'jsdoc/check-tag-names': [
      'error',
      {
        definedTags: ['jest-environment']
      }
    ],
    'jsdoc/check-types': 'error'
  }
}
