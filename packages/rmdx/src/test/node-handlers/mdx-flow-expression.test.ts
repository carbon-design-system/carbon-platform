/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import test from 'ava'

import { process } from '../../main/index.js'

test('it replaces an mdx flow expression with an error node', (t) => {
  const result = process('asdf\n{x+y}', [])

  t.deepEqual(result, {
    frontmatter: {},
    ast: {
      children: [
        {
          children: [{ value: 'asdf', props: { parentType: 'paragraph' }, type: 'text' }],
          props: { parentType: 'document' },
          type: 'paragraph'
        },
        { type: '__error__', data: { errorIndex: 0 } }
      ],
      props: { parentType: '' },
      type: 'document'
    },
    errors: [
      {
        type: 'RestrictedSyntaxException',
        position: {
          start: { line: 2, column: 1, offset: 5 },
          end: { line: 2, column: 6, offset: 10 }
        },
        src: '{x+y}'
      }
    ]
  })
})

test('it removes first-node mdx flow expressions', (t) => {
  const result = process('{x+y}\nasdf', [])

  t.deepEqual(result, {
    frontmatter: {},
    ast: {
      children: [
        { type: '__error__', data: { errorIndex: 0 } },
        {
          children: [{ value: 'asdf', props: { parentType: 'paragraph' }, type: 'text' }],
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
          end: { line: 1, column: 6, offset: 5 }
        },
        src: '{x+y}'
      }
    ]
  })
})

test('it removes mdx flow expressions when they are the only node', (t) => {
  const result = process('{x+y}', [])

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
          end: { line: 1, column: 6, offset: 5 }
        },
        src: '{x+y}'
      }
    ]
  })
})
