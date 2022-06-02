/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { InvalidInputException } from '@carbon-platform/api/microservice'
import * as graphql from 'graphql'

import { DataGraphController } from './../main/data-graph-controller'

jest.mock('graphql')
const mockedGraphql = graphql as jest.Mocked<typeof graphql>

mockedGraphql.graphql.mockReturnValue({} as any)

const mockedChannelRef = {
  ack: jest.fn(),
  nack: jest.fn()
}
const mockedContext = {
  getChannelRef: () => mockedChannelRef,
  getMessage: jest.fn()
}
const mockedModuleRef = {
  schema: {}
}

describe('validation', () => {
  it('throws when query is not specified', async () => {
    const controller = new DataGraphController({ get: jest.fn(() => mockedModuleRef) } as any)

    const resultPromise = controller.dataGraph({}, mockedContext as any)

    await expect(resultPromise).rejects.toThrow(InvalidInputException)
    expect(mockedChannelRef.nack).toHaveBeenCalled()
  })

  it('throws when query is not a string', async () => {
    const controller = new DataGraphController({ get: jest.fn(() => mockedModuleRef) } as any)

    const resultPromise = controller.dataGraph({ query: 123 }, mockedContext as any)

    await expect(resultPromise).rejects.toThrow(InvalidInputException)
    expect(mockedChannelRef.nack).toHaveBeenCalled()
  })

  it('throws when variables is not an object', async () => {
    const controller = new DataGraphController({ get: jest.fn(() => mockedModuleRef) } as any)

    const resultPromise = controller.dataGraph(
      { query: 'asdf', variables: 'asdf' },
      mockedContext as any
    )

    await expect(resultPromise).rejects.toThrow(InvalidInputException)
    expect(mockedChannelRef.nack).toHaveBeenCalled()
  })
})

test('it calls ack on the success path', async () => {
  const controller = new DataGraphController({ get: jest.fn(() => mockedModuleRef) } as any)

  const resultPromise = controller.dataGraph(
    { query: 'query { libraries { id } }' },
    mockedContext as any
  )

  const result = await resultPromise

  expect(result.data).toEqual({})
  expect(result.errors).toBeUndefined()
  expect(mockedChannelRef.ack).toHaveBeenCalled()
})
