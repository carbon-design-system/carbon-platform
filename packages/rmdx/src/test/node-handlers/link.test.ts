/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import test from 'ava'

import { process } from '../../main/index.js'

test('it can process links', (t) => {
  const result = process('[this is link text](./this/is/a/link.html)', [])
  t.deepEqual(result, {
    frontmatter: {},
    errors: [],
    ast: {
      children: [
        {
          children: [
            {
              children: [
                { value: 'this is link text', props: { parentNodeType: 'link' }, nodeType: 'text' }
              ],
              props: { parentNodeType: 'paragraph', href: './this/is/a/link.html' },
              nodeType: 'link'
            }
          ],
          props: { parentNodeType: 'document' },
          nodeType: 'paragraph'
        }
      ],
      props: { parentNodeType: '' },
      nodeType: 'document'
    }
  })
})
