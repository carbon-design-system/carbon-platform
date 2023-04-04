/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import test from 'ava'

import { process } from '../../main/index.js'

test('it can process plain text', (t) => {
  const result = process('boring, but necessary', [])
  t.deepEqual(result, {
    frontmatter: {},
    errors: [],
    ast: {
      children: [
        {
          type: 'paragraph',
          props: { parentType: 'document' },
          children: [
            {
              value: 'boring, but necessary',
              props: { parentType: 'paragraph' },
              type: 'text'
            }
          ]
        }
      ],
      props: { parentType: '' },
      type: 'document'
    }
  })
})
