/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import test from 'ava'

import { process } from '../../main/index.js'

test('it can process images', (t) => {
  const result = process('![image alt text](./path/to/image.jpg)', [])
  t.deepEqual(result, {
    frontmatter: {},
    errors: [],
    ast: {
      children: [
        {
          children: [
            {
              props: {
                parentNodeType: 'paragraph',
                alt: 'image alt text',
                src: './path/to/image.jpg'
              },
              nodeType: 'image'
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
