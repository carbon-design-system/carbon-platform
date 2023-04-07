/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import test from 'ava'

import { process } from '../main/index.js'

test('it runs without crashing', (t) => {
  const result = process('', [])
  t.deepEqual(result, {
    frontmatter: {},
    errors: [],
    ast: { type: 'document', children: [], props: { parentType: '' } }
  })
})

test('it processes frontmatter', (t) => {
  const result = process(
    `---
front: matter
wow: [factor]
value: 7
---`,
    []
  )

  t.deepEqual(result, {
    ast: {
      children: [],
      type: 'document',
      props: {
        parentType: ''
      }
    },
    frontmatter: {
      front: 'matter',
      value: 7,
      wow: ['factor']
    },
    errors: []
  })
})

test('it can produce more than one error at a time', (t) => {
  const result = process('<NotARealComponent />\n{x+y}', [])

  t.deepEqual(result, {
    frontmatter: {},
    ast: {
      children: [
        { type: '__error__', data: { errorIndex: 0 } },
        { type: '__error__', data: { errorIndex: 1 } }
      ],
      props: { parentType: '' },
      type: 'document'
    },
    errors: [
      {
        type: 'UnknownComponentException',
        position: {
          start: { line: 1, column: 1, offset: 0 },
          end: { line: 1, column: 22, offset: 21 }
        },
        src: 'NotARealComponent'
      },
      {
        type: 'RestrictedSyntaxException',
        position: {
          start: { line: 2, column: 1, offset: 22 },
          end: { line: 2, column: 6, offset: 27 }
        },
        src: '{x+y}'
      }
    ]
  })
})
