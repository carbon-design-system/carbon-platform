/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { InvalidInputException } from '@carbon-platform/api/microservice'
import test from 'ava'
import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql'

import { DataGraphController } from '../main/data-graph-controller.js'

const mockChannelRef = {
  ack: () => undefined,
  nack: () => undefined
}
const mockContext = {
  getChannelRef: () => mockChannelRef,
  getMessage: () => undefined
}
const mockModuleRef = {
  schema: new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'RootQueryType',
      fields: {
        hello: {
          type: GraphQLString,
          resolve() {
            return 'world'
          }
        }
      }
    })
  })
}

test('it throws when query is not specified', async (t) => {
  const controller = new DataGraphController({ get: () => mockModuleRef } as any)

  const err = await t.throwsAsync(() => controller.queryDataGraph({}, mockContext as any))

  t.true(err instanceof InvalidInputException)
})

test('it throws when query is not a string', async (t) => {
  const controller = new DataGraphController({ get: () => mockModuleRef } as any)

  const err = await t.throwsAsync(() =>
    controller.queryDataGraph({ query: 123 } as any, mockContext as any)
  )

  t.true(err instanceof InvalidInputException)
})

test('throws when variables is not an object', async (t) => {
  const controller = new DataGraphController({ get: () => mockModuleRef } as any)

  const err = await t.throwsAsync(() =>
    controller.queryDataGraph({ query: 'asdf', variables: 'asdf' } as any, mockContext as any)
  )

  t.true(err instanceof InvalidInputException)
})

test('it calls ack on the success path', async (t) => {
  t.plan(1)

  const myMockChannelRef = {
    ack: () => {
      t.pass()
    },
    nack: () => undefined
  }
  const myMockContext = {
    getChannelRef: () => myMockChannelRef,
    getMessage: () => undefined
  }

  const controller = new DataGraphController({ get: () => mockModuleRef } as any)

  await controller.queryDataGraph({ query: '{}' }, myMockContext as any)
})

test('it calls nack on the validation error path', async (t) => {
  t.plan(1)

  const myMockChannelRef = {
    ack: () => undefined,
    nack: () => {
      t.pass()
    }
  }
  const myMockContext = {
    getChannelRef: () => myMockChannelRef,
    getMessage: () => undefined
  }

  const controller = new DataGraphController({ get: () => mockModuleRef } as any)

  try {
    await controller.queryDataGraph({}, myMockContext as any)
  } catch (e) {}
})
