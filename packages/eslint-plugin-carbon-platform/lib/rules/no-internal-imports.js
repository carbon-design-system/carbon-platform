/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict'

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'problem',
    messages: {
      'no-internal-imports':
        'Carbon Platform package imports must not be from internal portions of the packages, ' +
        'such as the `dist` folder.'
    },
    docs: {
      description:
        'Carbon Platform package imports must not be from internal portions of the packages, ' +
        'such as the `dist` folder.',
      recommended: true
    },
    fixable: null,
    schema: []
  },

  create(context) {
    return {
      // visitor functions for different types of nodes
      ImportDeclaration(node) {
        if (!node.source.value.match(/@carbon-platform\/.*\/dist\//)) {
          return
        }

        context.report({
          node,
          messageId: 'no-internal-imports'
        })
      }
    }
  }
}
