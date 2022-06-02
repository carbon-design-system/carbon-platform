/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { gql } from '../../main/data-graph/gql'

test('it returns a basic string correctly', () => {
  // prettier-ignore
  const result = gql`query Test { libraries { id } }`

  expect(result).toBe('query Test { libraries { id } }')
})

test('it returns a minified string', () => {
  const result = gql`
    query Test {
      libraries {
        id
      }
    }
  `

  expect(result).toBe('query Test { libraries { id } }')
})

test('it handles substitutions', () => {
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

  expect(result).toBe('query Test { libraries { id name } }')
})

test('it works even when you try to break it', () => {
  const sub = 123
  // Explicitly test no additional whitespace
  const result = gql([] as any, sub)

  expect(result).toBe('123')
})
