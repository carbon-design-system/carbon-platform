/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import test from 'ava'

import { process } from '../../main/index.js'

test('it removes mdx text expressions', (t) => {
  const result = process("asdf {'some text'}", [])
  t.deepEqual(result, {
    frontmatter: {},
    ast: {
      children: [
        {
          children: [
            { value: 'asdf ', props: { parentType: 'paragraph' }, type: 'text' },
            { type: '__error__', data: { errorIndex: 0 } }
          ],
          props: { parentType: 'document' },
          type: 'paragraph'
        }
      ],
      props: { parentType: '' },
      type: 'document'
    },
    errors: [
      {
        type: 'RestrictedSyntaxException',
        position: {
          start: { line: 1, column: 6, offset: 5 },
          end: { line: 1, column: 19, offset: 18 }
        },
        src: "{'some text'}"
      }
    ]
  })
})

test('it removes first-node mdx text expressions', (t) => {
  const result = process("{'some text'} asdf", [])
  t.deepEqual(result, {
    frontmatter: {},
    ast: {
      children: [
        {
          children: [
            { type: '__error__', data: { errorIndex: 0 } },
            { value: ' asdf', props: { parentType: 'paragraph' }, type: 'text' }
          ],
          props: { parentType: 'document' },
          type: 'paragraph'
        }
      ],
      props: { parentType: '' },
      type: 'document'
    },
    errors: [
      {
        type: 'RestrictedSyntaxException',
        position: {
          start: { line: 1, column: 1, offset: 0 },
          end: { line: 1, column: 14, offset: 13 }
        },
        src: "{'some text'}"
      }
    ]
  })
})
