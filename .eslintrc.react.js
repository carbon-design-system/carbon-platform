/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * @see https://www.npmjs.com/package/eslint-plugin-react
 */
module.exports = {
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react/jsx-runtime'
  ],
  plugins: ['import', 'react', 'react-hooks', 'jsx-a11y'],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'jsx-a11y/alt-text': 'error',
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/aria-proptypes': 'error',
    'jsx-a11y/aria-unsupported-elements': 'error',
    // Avoid false-positives on Next.js `Link`s that don't appear to satisfy a11y requirements
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton']
      }
    ],
    'jsx-a11y/role-has-required-aria-props': 'error',
    'jsx-a11y/role-supports-aria-props': 'error',

    'react/button-has-type': 'error',
    'react/jsx-no-useless-fragment': 'error',
    'react/jsx-uses-vars': 'error',
    'react/no-find-dom-node': 'error',
    'react/prop-types': ['error', { skipUndeclared: true }],
    'react/sort-prop-types': 'error',

    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error'
  }
}
