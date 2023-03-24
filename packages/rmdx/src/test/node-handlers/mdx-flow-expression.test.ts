/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import test from 'ava'

import { process } from '../../main/index.js'

test('it removes mdx flow expressions', (t) => {
  const result = process('asdf\n{x+y}', [])
  t.deepEqual(result, {
    frontmatter: {},
    ast: {
      children: [
        {
          children: [{ value: 'asdf', props: { parentNodeType: 'paragraph' }, nodeType: 'text' }],
          props: { parentNodeType: 'document' },
          nodeType: 'paragraph'
        }
      ],
      props: { parentNodeType: '' },
      nodeType: 'document'
    }
  })
})

test('it removes first-node mdx flow expressions', (t) => {
  const result = process('{x+y}\nasdf', [])
  t.deepEqual(result, {
    frontmatter: {},
    ast: {
      children: [
        {
          children: [{ value: 'asdf', props: { parentNodeType: 'paragraph' }, nodeType: 'text' }],
          props: { parentNodeType: 'document' },
          nodeType: 'paragraph'
        }
      ],
      props: { parentNodeType: '' },
      nodeType: 'document'
    }
  })
})

test('it removes mdx flow expressions when they are the only node', (t) => {
  const result = process('{x+y}', [])
  t.deepEqual(result, {
    frontmatter: {},
    ast: {
      children: [],
      props: { parentNodeType: '' },
      nodeType: 'document'
    }
  })
})
