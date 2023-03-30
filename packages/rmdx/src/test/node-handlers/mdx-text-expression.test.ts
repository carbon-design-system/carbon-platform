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
    errors: [],
    ast: {
      children: [
        {
          children: [{ value: 'asdf ', props: { parentNodeType: 'paragraph' }, nodeType: 'text' }],
          props: { parentNodeType: 'document' },
          nodeType: 'paragraph'
        }
      ],
      props: { parentNodeType: '' },
      nodeType: 'document'
    }
  })
})

test('it removes first-node mdx text expressions', (t) => {
  const result = process("{'some text'} asdf", [])
  t.deepEqual(result, {
    frontmatter: {},
    errors: [],
    ast: {
      children: [
        {
          children: [{ value: ' asdf', props: { parentNodeType: 'paragraph' }, nodeType: 'text' }],
          props: { parentNodeType: 'document' },
          nodeType: 'paragraph'
        }
      ],
      props: { parentNodeType: '' },
      nodeType: 'document'
    }
  })
})
