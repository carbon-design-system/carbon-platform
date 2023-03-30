/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import test from 'ava'

import { process } from '../../main/index.js'

test('it can process inline a code block', (t) => {
  const result = process('```\nSystem.out.println("Hello, world!")\n```', [])
  t.deepEqual(result, {
    frontmatter: {},
    errors: [],
    ast: {
      children: [
        {
          value: 'System.out.println("Hello, world!")',
          props: { parentNodeType: 'document', meta: '', lang: '' },
          nodeType: 'code'
        }
      ],
      props: { parentNodeType: '' },
      nodeType: 'document'
    }
  })
})
