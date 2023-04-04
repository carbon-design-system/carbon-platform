/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import test from 'ava'

import { process } from '../../main/index.js'

test('it can process a paragraph', (t) => {
  const result = process('a', [])
  t.deepEqual(result, {
    frontmatter: {},
    errors: [],
    ast: {
      children: [
        {
          children: [{ value: 'a', props: { parentType: 'paragraph' }, type: 'text' }],
          props: { parentType: 'document' },
          type: 'paragraph'
        }
      ],
      props: { parentType: '' },
      type: 'document'
    }
  })
})
