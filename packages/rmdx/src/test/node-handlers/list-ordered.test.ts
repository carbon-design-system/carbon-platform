/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import test from 'ava'

import { process } from '../../main/index.js'

test('it can process ordered lists', (t) => {
  const result = process(
    `
1. first
    1. indented
2. second
`,
    []
  )
  t.deepEqual(result, {
    frontmatter: {},
    errors: [],
    ast: {
      children: [
        {
          children: [
            {
              children: [
                {
                  children: [{ value: 'first', props: { parentType: 'paragraph' }, type: 'text' }],
                  props: { parentType: 'list-item' },
                  type: 'paragraph'
                },
                {
                  children: [
                    {
                      children: [
                        {
                          children: [
                            {
                              value: 'indented',
                              props: { parentType: 'paragraph' },
                              type: 'text'
                            }
                          ],
                          props: { parentType: 'list-item' },
                          type: 'paragraph'
                        }
                      ],
                      props: { parentType: 'ordered-list' },
                      type: 'list-item'
                    }
                  ],
                  props: { parentType: 'list-item' },
                  type: 'ordered-list'
                }
              ],
              props: { parentType: 'ordered-list' },
              type: 'list-item'
            },
            {
              children: [
                {
                  children: [{ value: 'second', props: { parentType: 'paragraph' }, type: 'text' }],
                  props: { parentType: 'list-item' },
                  type: 'paragraph'
                }
              ],
              props: { parentType: 'ordered-list' },
              type: 'list-item'
            }
          ],
          props: { parentType: 'document' },
          type: 'ordered-list'
        }
      ],
      props: { parentType: '' },
      type: 'document'
    }
  })
})
