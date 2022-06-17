/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const path = require('path')

const noUnusedVarsOptions = { args: 'all', argsIgnorePattern: '^_' }

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'standard',
    'plugin:@next/next/recommended',
    'plugin:eslint-comments/recommended',
    path.join(__dirname, '.eslintrc.ava.js'),
    path.join(__dirname, '.eslintrc.jsdoc.js'),
    path.join(__dirname, '.eslintrc.react.js'),
    path.join(__dirname, '.eslintrc.storybook.js')
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2021,
    lib: ['es2021']
  },
  plugins: ['@typescript-eslint', 'notice', 'simple-import-sort'],
  rules: {
    '@typescript-eslint/no-use-before-define': [
      'error',
      { functions: false, classes: true, variables: false }
    ],
    'eslint-comments/require-description': 'error',
    indent: ['error', 2, { ignoredNodes: ['PropertyDefinition[decorators]'], SwitchCase: 1 }],
    'max-len': [
      'error',
      {
        code: 150, // Effectively disable this rule and allow Prettier to handle it
        comments: 100
      }
    ],
    'no-implicit-globals': 'error',
    'no-use-before-define': 'off', // Disabled in favor of @typescript-eslint/no-use-before-define
    'no-unused-vars': ['error', noUnusedVarsOptions],
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
      files: ['!**/src/test/**/*.test.[jt]s'],
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
      files: ['**/packages/**'],
      rules: {
        'no-restricted-syntax': [
          'error',
          {
            selector: 'ImportDeclaration[source.value=/@carbon-platform.*/]',
            message:
              'Carbon Platform API package imports from inside of the API package must be ' +
              'relative. This prevents out-of-date builds from being accidentally imported.'
          }
        ]
      }
    },
    {
      files: ['*.ts'],
      rules: {
        'no-unused-vars': 'off', // Disabled in favor of @typescript-eslint/no-unused-vars
        '@typescript-eslint/no-unused-vars': ['error', noUnusedVarsOptions]
      }
    },
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      excludedFiles: ['.*.js'],
      processor: '@graphql-eslint/graphql'
    },
    {
      files: ['*.graphql'],
      // graphql-eslint doesn't work as a top-level extension/plugin, so include it here instead
      extends: [path.join(__dirname, '.eslintrc.graphql.js')]
    }
  ],
  settings: {
    next: {
      rootDir: ['services/web-app']
    }
  }
}
