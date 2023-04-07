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
    errors: [],
    ast: {
      children: [
        {
          children: [
            {
              value: 'this is inline code',
              props: { parentType: 'paragraph' },
              type: 'inline-code'
            }
          ],
          props: { parentType: 'document' },
          type: 'paragraph'
        }
      ],
      props: { parentType: '' },
      type: 'document'
    }
  })
})
