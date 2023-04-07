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
          children: [{ value: 'one', props: { parentType: 'heading-1' }, type: 'text' }],
          props: { parentType: 'document', fullText: 'one' },
          type: 'heading-1'
        },
        {
          children: [{ value: 'two', props: { parentType: 'heading-2' }, type: 'text' }],
          props: { parentType: 'document', fullText: 'two' },
          type: 'heading-2'
        },
        {
          children: [{ value: 'three', props: { parentType: 'heading-3' }, type: 'text' }],
          props: { parentType: 'document', fullText: 'three' },
          type: 'heading-3'
        },
        {
          children: [{ value: 'four', props: { parentType: 'heading-4' }, type: 'text' }],
          props: { parentType: 'document', fullText: 'four' },
          type: 'heading-4'
        },
        {
          children: [{ value: 'five', props: { parentType: 'heading-5' }, type: 'text' }],
          props: { parentType: 'document', fullText: 'five' },
          type: 'heading-5'
        },
        {
          children: [{ value: 'six', props: { parentType: 'heading-6' }, type: 'text' }],
          props: { parentType: 'document', fullText: 'six' },
          type: 'heading-6'
        }
      ],
      props: { parentType: '' },
      type: 'document'
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
            { value: 'wow ', props: { parentType: 'heading-1' }, type: 'text' },
            {
              value: 'code in a heading',
              props: { parentType: 'heading-1' },
              type: 'inline-code'
            }
          ],
          props: { parentType: 'document', fullText: 'wow code in a heading' },
          type: 'heading-1'
        }
      ],
      props: { parentType: '' },
      type: 'document'
    }
  })
})
