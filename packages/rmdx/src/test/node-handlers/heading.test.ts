/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import test from 'ava'

import { process } from '../../main/index.js'

test('it can process headings', (t) => {
  const result = process(
    `
# one
## two
### three
#### four
##### five
###### six
  `,
    []
  )
  t.deepEqual(result, {
    frontmatter: {},
    errors: [],
    ast: {
      children: [
        {
          children: [{ value: 'one', props: { parentNodeType: 'heading-1' }, nodeType: 'text' }],
          props: { parentNodeType: 'document', fullText: 'one' },
          nodeType: 'heading-1'
        },
        {
          children: [{ value: 'two', props: { parentNodeType: 'heading-2' }, nodeType: 'text' }],
          props: { parentNodeType: 'document', fullText: 'two' },
          nodeType: 'heading-2'
        },
        {
          children: [{ value: 'three', props: { parentNodeType: 'heading-3' }, nodeType: 'text' }],
          props: { parentNodeType: 'document', fullText: 'three' },
          nodeType: 'heading-3'
        },
        {
          children: [{ value: 'four', props: { parentNodeType: 'heading-4' }, nodeType: 'text' }],
          props: { parentNodeType: 'document', fullText: 'four' },
          nodeType: 'heading-4'
        },
        {
          children: [{ value: 'five', props: { parentNodeType: 'heading-5' }, nodeType: 'text' }],
          props: { parentNodeType: 'document', fullText: 'five' },
          nodeType: 'heading-5'
        },
        {
          children: [{ value: 'six', props: { parentNodeType: 'heading-6' }, nodeType: 'text' }],
          props: { parentNodeType: 'document', fullText: 'six' },
          nodeType: 'heading-6'
        }
      ],
      props: { parentNodeType: '' },
      nodeType: 'document'
    }
  })
})

test('it can process code inside of a heading', (t) => {
  const result = process('# wow `code in a heading`', [])
  t.deepEqual(result, {
    frontmatter: {},
    errors: [],
    ast: {
      children: [
        {
          children: [
            { value: 'wow ', props: { parentNodeType: 'heading-1' }, nodeType: 'text' },
            {
              value: 'code in a heading',
              props: { parentNodeType: 'heading-1' },
              nodeType: 'inline-code'
            }
          ],
          props: { parentNodeType: 'document', fullText: 'wow code in a heading' },
          nodeType: 'heading-1'
        }
      ],
      props: { parentNodeType: '' },
      nodeType: 'document'
    }
  })
})
