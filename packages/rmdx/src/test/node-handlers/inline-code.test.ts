/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import test from 'ava'

import { process } from '../../main/index.js'

test('it can process inline code', (t) => {
  const result = process('`this is inline code`', [])
  t.deepEqual(result, {
    frontmatter: {},
    ast: {
      children: [
        {
          children: [
            {
              value: 'this is inline code',
              props: { parentNodeType: 'paragraph' },
              nodeType: 'inline-code'
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
