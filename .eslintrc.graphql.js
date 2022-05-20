/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
module.exports = {
  plugins: ['@graphql-eslint'],
  parser: '@graphql-eslint/eslint-plugin',
  extends: ['plugin:@graphql-eslint/operations-all'],
  rules: {
    '@graphql-eslint/no-unused-fragments': 'off',
    '@graphql-eslint/require-id-when-available': 'off',
    '@graphql-eslint/selection-set-depth': 'off',
    '@graphql-eslint/unique-operation-name': 'off',
    'eol-last': 'off',
    'notice/notice': 'off',
    'no-trailing-spaces': 'off',
    'no-multiple-empty-lines': 'off'
  }
}
