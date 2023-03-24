/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import test from 'ava'

import { process } from '../../main/index.js'

test('it can process a strong', (t) => {
  const result = process('**wow!**', [])
  t.deepEqual(result, {
    frontmatter: {},
    ast: {
      children: [
        {
          children: [
            {
              children: [{ value: 'wow!', props: { parentNodeType: 'strong' }, nodeType: 'text' }],
              props: { parentNodeType: 'paragraph' },
              nodeType: 'strong'
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
