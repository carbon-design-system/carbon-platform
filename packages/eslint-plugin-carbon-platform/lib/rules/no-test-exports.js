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
      'no-test-exports': 'Test exports are not allowed outside of test files.'
    },
    docs: {
      description: 'Test exports are not allowed outside of test files.',
      recommended: true
    },
    fixable: null,
    schema: []
  },

  create(context) {
    return {
      ImportSpecifier(node) {
        // Test files are okay
        if (context.getFilename().match(/src\/test/)) {
          return
        }

        if (node.imported.name !== '__test__') {
          return
        }

        context.report({
          node,
          messageId: 'no-test-exports'
        })
      }
    }
  }
}
