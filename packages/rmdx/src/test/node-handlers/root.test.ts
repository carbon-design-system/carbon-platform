/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import test from 'ava'

import { process } from '../../main/index.js'

test('it converts the root node to a "document" node', (t) => {
  const result = process('', [])
  t.deepEqual(result, {
    frontmatter: {},
    errors: [],
    ast: { children: [], props: { parentType: '' }, type: 'document' }
  })
})
