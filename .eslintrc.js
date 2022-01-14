/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const path = require('path')

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['standard', 'carbon', 'next', 'plugin:jest/recommended', 'plugin:jest/style'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'jest', 'notice', 'simple-import-sort'],
  rules: {
    'jest/consistent-test-it': ['error', { fn: 'test', withinDescribe: 'it' }],
    // Avoid false-positives on Next.js `Link`s that don't appear to satisfy a11y requirements
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton']
      }
    ],
    'max-len': [
      'error',
      {
        code: 150, // Effectively disable this rule and allow Prettier to handle it
        comments: 100
      }
    ],
    'notice/notice': [
      'error',
      {
        templateFile: path.join(__dirname, '.copyright.js')
      }
    ],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always'
      }
    ]
  },
  overrides: [
    {
      files: ['!**/src/test/**/*.test.ts'],
      rules: {
        'no-restricted-syntax': [
          'error',
          {
            selector: 'ImportSpecifier[imported.name="__test__"]',
            message: 'Test exports are not allowed to be used outside of test files.'
          }
        ]
      }
    },
    {
      files: ['*.ts'],
      rules: {
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['error']
      }
    }
  ],
  settings: {
    next: {
      rootDir: ['services/web-app']
    }
  }
}
