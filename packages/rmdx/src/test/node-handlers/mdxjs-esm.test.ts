/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import test from 'ava'

import { process } from '../../main/index.js'

test('it replaces an mdxjsEsm import expression with an error node', (t) => {
  const result = process("import x from 'y'", [])

  t.deepEqual(result, {
    frontmatter: {},
    ast: {
      children: [{ type: '__error__', data: { errorIndex: 0 } }],
      props: { parentType: '' },
      type: 'document'
    },
    errors: [
      {
        type: 'RestrictedSyntaxException',
        position: {
          start: { line: 1, column: 1, offset: 0 },
          end: { line: 1, column: 18, offset: 17 }
        },
        src: "import x from 'y'"
      }
    ]
  })
})

test('it replaces an mdxjsEsm export expression with an error node', (t) => {
  const result = process('export default x', [])

  t.deepEqual(result, {
    ast: {
      children: [{ type: '__error__', data: { errorIndex: 0 } }],
      type: 'document',
      props: {
        parentType: ''
      }
    },
    errors: [
      {
        position: {
          end: { column: 17, line: 1, offset: 16 },
          start: { column: 1, line: 1, offset: 0 }
        },
        src: 'export default x',
        type: 'RestrictedSyntaxException'
      }
    ],
    frontmatter: {}
  })
})
