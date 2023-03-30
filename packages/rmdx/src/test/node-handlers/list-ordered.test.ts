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
                  children: [
                    { value: 'first', props: { parentNodeType: 'paragraph' }, nodeType: 'text' }
                  ],
                  props: { parentNodeType: 'list-item' },
                  nodeType: 'paragraph'
                },
                {
                  children: [
                    {
                      children: [
                        {
                          children: [
                            {
                              value: 'indented',
                              props: { parentNodeType: 'paragraph' },
                              nodeType: 'text'
                            }
                          ],
                          props: { parentNodeType: 'list-item' },
                          nodeType: 'paragraph'
                        }
                      ],
                      props: { parentNodeType: 'ordered-list' },
                      nodeType: 'list-item'
                    }
                  ],
                  props: { parentNodeType: 'list-item' },
                  nodeType: 'ordered-list'
                }
              ],
              props: { parentNodeType: 'ordered-list' },
              nodeType: 'list-item'
            },
            {
              children: [
                {
                  children: [
                    { value: 'second', props: { parentNodeType: 'paragraph' }, nodeType: 'text' }
                  ],
                  props: { parentNodeType: 'list-item' },
                  nodeType: 'paragraph'
                }
              ],
              props: { parentNodeType: 'ordered-list' },
              nodeType: 'list-item'
            }
          ],
          props: { parentNodeType: 'document' },
          nodeType: 'ordered-list'
        }
      ],
      props: { parentNodeType: '' },
      nodeType: 'document'
    }
  })
})
