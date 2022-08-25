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
      'self-isolated-packages':
        'Carbon Platform packages must be self-isolated. They cannot import from other Carbon ' +
        'Platform packages. Consider having the package caller use dependency injection to ' +
        'provide this package with what it needs instead. This prevents out-of-date builds from ' +
        'being accidentally imported.'
    },
    docs: {
      description:
        'Carbon Platform packages must be self-isolated. They cannot import from other Carbon ' +
        'Platform packages. Consider having the package caller use dependency injection to ' +
        'provide this package with what it needs instead. This prevents out-of-date builds from ' +
        'being accidentally imported.',
      recommended: true
    },
    fixable: null,
    schema: []
  },

  create(context) {
    return {
      // visitor functions for different types of nodes
      ImportDeclaration(node) {
        if (!context.getFilename().match(/\/packages\//)) {
          return
        }

        if (!node.source.value.match(/@carbon-platform/)) {
          return
        }

        context.report({
          node,
          messageId: 'self-isolated-packages'
        })
      }
    }
  }
}
