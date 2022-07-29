/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import test from 'ava'

import { DataGraph } from '../../main/data-graph/data-graph.js'
import { gql } from '../../main/data-graph/gql.js'
import { RunMode } from '../../main/runtime/interfaces.js'
import { Runtime } from '../../main/runtime/runtime.js'

test('it can retrieve dev data without crashing', async (t) => {
  const runtime = new Runtime({ runMode: RunMode.Dev })
  const dataGraph = new DataGraph({ runtime })

  const result = await dataGraph.queryData<any>({
    query: gql`
      query BasicExample {
        libraries {
          id
        }
      }
    `
  })

  t.is(result.data.hello, 'world')
})

test('it can retrieve dev data with variables without crashing', async (t) => {
  const runtime = new Runtime({ runMode: RunMode.Dev })
  const dataGraph = new DataGraph({ runtime })

  const result = await dataGraph.queryData<any>({
    query: gql`
      query ExampleWithVariables {
        libraries {
          id
        }
      }
    `,
    variables: {
      varName: 'var value'
    }
  })

  t.is(result.data.hello, 'world')
})

test('it throws when retrieving a non-existant dev dataset query', async (t) => {
  const runtime = new Runtime({ runMode: RunMode.Dev })
  const dataGraph = new DataGraph({ runtime })

  await t.throwsAsync(async () =>
    dataGraph.queryData<any>({
      query: gql`
        query DoesNotExist {
          libraries {
            id
          }
        }
      `
    })
  )
})

test('it can get a dynamically added dev dataset entry', async (t) => {
  const runtime = new Runtime({ runMode: RunMode.Dev })
  const dataGraph = new DataGraph({ runtime })

  dataGraph.addDevDataset([{ name: 'wowtest', response: { hello: 'world' } }])

  const result = await dataGraph.queryData<any>({ query: 'query wowtest { asdf { id } }' })

  console.log(result)

  t.is(result.data.hello, 'world')
})
