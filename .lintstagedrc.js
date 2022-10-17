/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Note: any groups with two or more linters should end with a non-fix version of each linter to
// ensure no thrashing occurred between the linters/formatters

module.exports = {
  '**/*.(js|cjs|mjs|jsx|ts|tsx)': [
    'prettier --write',
    'eslint --fix',
    'prettier --check',
    'eslint --max-warnings=0'
  ],
  '**/*.scss': ['prettier --write', 'stylelint --fix', 'prettier --check', 'stylelint'],
  '!(*sass).md': ['prettier --write'],
  '**/package.json': ['scripts/format-package-json.mjs']
}
