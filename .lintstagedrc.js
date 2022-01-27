/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
module.exports = {
  '**/*.(js|jsx|ts|tsx)': ['prettier --write', 'eslint --fix'],
  '**/*.scss': ['prettier --write', 'stylelint --fix'],
  '!(*sass).md': ['prettier --write']
}
