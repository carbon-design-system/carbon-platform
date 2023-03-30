/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import test from 'ava'

import { process } from '../../main/index.js'

test('it can process unordered lists', (t) => {
  const result = process(
    `
- first
    - indented
- second
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
                      props: { parentNodeType: 'unordered-list' },
                      nodeType: 'list-item'
                    }
                  ],
                  props: { parentNodeType: 'list-item' },
                  nodeType: 'unordered-list'
                }
              ],
              props: { parentNodeType: 'unordered-list' },
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
              props: { parentNodeType: 'unordered-list' },
              nodeType: 'list-item'
            }
          ],
          props: { parentNodeType: 'document' },
          nodeType: 'unordered-list'
        }
      ],
      props: { parentNodeType: '' },
      nodeType: 'document'
    }
  })
})
