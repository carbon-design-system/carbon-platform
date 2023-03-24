/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import test from 'ava'

import { process } from '../main/index.js'

test('it runs without crashing', (t) => {
  const result = process('', [])
  t.deepEqual(result, {
    frontmatter: {},
    ast: { nodeType: 'document', children: [], props: { parentNodeType: '' } }
  })
})

test('it processes frontmatter', (t) => {
  const result = process(
    `---
front: matter
wow: [factor]
value: 7
---`,
    []
  )

  t.deepEqual(result, {
    ast: {
      children: [],
      nodeType: 'document',
      props: {
        parentNodeType: ''
      }
    },
    frontmatter: {
      front: 'matter',
      value: 7,
      wow: ['factor']
    }
  })
})
