/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import amqp from 'amqplib'
import { v4 as uuidv4 } from 'uuid'

import { EventMessage, MessagingClient, QueryMessage } from '../../main/messaging'
import { __test__ } from '../../main/messaging/messaging-client'

jest.mock('amqplib')
const mockedAmqp = amqp as jest.Mocked<typeof amqp>

jest.mock('uuid', () => {
  return {
    v4: jest.fn().mockReturnValue('abc123')
  }
})

let mockedConnection: any
let mockedChannel: any
let replyCallback: (reply: any) => any

beforeEach(() => {
  mockedChannel = {
    assertQueue: jest.fn().mockImplementation((queueName) => {
      return {
        queue: queueName
      }
    }),
    close: jest.fn(),
    consume: jest.fn().mockImplementation((queueName: string, callback: (reply: any) => void) => {
      replyCallback = callback
    }),
    publish: jest.fn().mockReturnValue(true),
    sendToQueue: jest.fn().mockReturnValue(true),
    waitForConfirms: jest.fn().mockResolvedValue(null)
  }
  mockedConnection = {
    close: jest.fn(),
    createConfirmChannel: jest.fn().mockReturnValue(mockedChannel)
  }

  mockedAmqp.connect.mockReturnValue(mockedConnection as any)
  __test__.destroyInstance()
})

test('emit', async () => {
  const client = MessagingClient.getInstance()
  const eventType = EventMessage.LogLogged

  const expectedMessage = { pattern: eventType, data: 'the message' }
  const expectedArgs = [eventType, '', Buffer.from(JSON.stringify(expectedMessage))]

  await client.emit(eventType, expectedMessage.data)

  expect(mockedChannel.publish).toHaveBeenCalledWith(...expectedArgs)
})

test('query', async () => {
  const client = MessagingClient.getInstance()
  const queryType = QueryMessage.Example

  const expectedMessage = { pattern: queryType, id: uuidv4(), data: 'the message' }
  const expectedArgs = [
    queryType,
    '',
    Buffer.from(JSON.stringify(expectedMessage)),
    {
      replyTo: __test__.RANDOM_QUEUE_NAME,
      correlationId: uuidv4()
    }
  ]

  const promise = client.query(queryType, expectedMessage.data)

  setImmediate(() => {
    replyCallback.bind(client)({
      properties: {
        correlationId: uuidv4()
      },
      content: 'the response'
    })
  })

  await promise

  expect(mockedChannel.assertQueue).toHaveBeenCalled()
  expect(mockedChannel.publish).toHaveBeenCalledWith(...expectedArgs)
})

test('waits for confirms before resolving emit', async () => {
  mockedChannel.publish = jest.fn().mockReturnValue(false)

  const client = MessagingClient.getInstance()
  const eventType = EventMessage.LogLogged

  const expectedMessage = { pattern: eventType, data: 'the message' }

  await client.emit(eventType, expectedMessage.data)

  expect(mockedChannel.publish).toHaveBeenCalled()
  expect(mockedChannel.waitForConfirms).toHaveBeenCalled()
})

test('waits for confirms before resolving query', async () => {
  mockedChannel.publish = jest.fn().mockReturnValue(false)

  const client = MessagingClient.getInstance()
  const queryType = QueryMessage.Example

  const expectedMessage = { pattern: queryType, data: 'the message' }

  const promise = client.query(queryType, expectedMessage.data)

  setImmediate(() => {
    replyCallback.bind(client)({
      properties: {
        correlationId: uuidv4()
      },
      content: 'the response'
    })
  })

  await promise

  expect(mockedChannel.publish).toHaveBeenCalled()
  expect(mockedChannel.waitForConfirms).toHaveBeenCalled()
})

describe('connect', () => {
  it('calls connect at most one time without explicit awaits', async () => {
    const client = MessagingClient.getInstance()

    client.connect(false)
    client.connect(false)
    await client.connect(false)

    expect(mockedAmqp.connect).toHaveBeenCalledTimes(1)
  })

  it('calls connect at most one time when the connection is already established', async () => {
    const client = MessagingClient.getInstance()

    const first = await client.connect(false)
    const second = await client.connect(false)

    expect(mockedAmqp.connect).toHaveBeenCalledTimes(1)
    expect(first).toStrictEqual(second)
  })
})

describe('error paths', () => {
  it('throws with no connection', async () => {
    mockedAmqp.connect.mockImplementation(() => {
      throw new Error('connection failure test!')
    })

    const client = MessagingClient.getInstance()

    await expect(client.connect(false)).rejects.toThrow()
  })

  it('quietly ignores replies for unknown correlation IDs', async () => {
    // Since no messages are emitted or queried, the replyCallbacks map in the messaging client will
    // be empty. That means that any value passed to the replyCallback as the correlation id will
    // always result in the "id not found" error path being taken.

    const client = MessagingClient.getInstance()
    await client.connect()

    expect(() => {
      replyCallback.bind(client)({
        properties: {
          correlationId: 'not found'
        },
        content: 'the response'
      })
    }).not.toThrow()
  })
})
