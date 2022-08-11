/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import test from 'ava'

import { gql } from '../../main/data-graph/gql.js'

test('it returns a minified string', (t) => {
  const result = gql`
    query Test {
      libraries {
        id
      }
    }
  `

  t.is(result, 'query Test { libraries { id } }')
})

test('it handles substitutions', (t) => {
  const field = 'name'
  const result = gql`
    query Test
    {
      libraries {
        id
        ${field}
      }
    }
  `

  t.is(result, 'query Test { libraries { id name } }')
})

test('it works even when you try to break it', (t) => {
  const sub = 123
  // Explicitly test no additional whitespace
  const result = gql([] as any, sub)

  t.is(result, '123')
})
