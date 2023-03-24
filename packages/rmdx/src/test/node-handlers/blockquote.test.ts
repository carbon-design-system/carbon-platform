/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import test from 'ava'

import { process } from '../../main/index.js'

test('it can process a blockquote', (t) => {
  const result = process('> This is a blockquote', [])
  t.deepEqual(result, {
    frontmatter: {},
    ast: {
      nodeType: 'document',
      children: [
        {
          nodeType: 'blockquote',
          children: [
            {
              nodeType: 'paragraph',
              children: [
                {
                  nodeType: 'text',
                  value: 'This is a blockquote',
                  props: {
                    parentNodeType: 'paragraph'
                  }
                }
              ],
              props: {
                parentNodeType: 'blockquote'
              }
            }
          ],
          props: {
            parentNodeType: 'document'
          }
        }
      ],
      props: {
        parentNodeType: ''
      }
    }
  })
})
