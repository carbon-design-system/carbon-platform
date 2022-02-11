/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { NestFactory } from '@nestjs/core'
import amqplib from 'amqplib'

import {
  DEFAULT_BIND_PATTERN,
  DEFAULT_EXCHANGE_OPTIONS,
  DEFAULT_EXCHANGE_TYPE,
  DEFAULT_QUEUE_OPTIONS,
  EventMessage,
  Queue
} from '../../main/messaging'
import { PlatformMicroservice } from '../../main/microservice'

jest.mock('amqplib')
jest.mock('@nestjs/core')

const mockedAmqplib = amqplib as jest.Mocked<typeof amqplib>
const mockedNestFactory = NestFactory as jest.Mocked<typeof NestFactory>

class PlatformMicroserviceImpl extends PlatformMicroservice {}

let mockedChannel: any = null
let mockedConnection: any = null
const mockedListen = jest.fn()

beforeEach(() => {
  mockedChannel = {
    assertQueue: jest.fn(),
    assertExchange: jest.fn(),
    bindQueue: jest.fn(),
    close: jest.fn()
  }
  mockedConnection = {
    createChannel: jest.fn(() => mockedChannel),
    close: jest.fn()
  }
  mockedAmqplib.connect.mockReturnValue(mockedConnection)

  mockedNestFactory.createMicroservice.mockResolvedValue({
    listen: mockedListen
  } as any)
})

test('bind', async () => {
  const microservice = new PlatformMicroserviceImpl(Queue.Logging, { myOption: 'test' })

  await microservice.bind(EventMessage.LogLogged)

  expect(mockedAmqplib.connect).toHaveBeenCalled()
  expect(mockedConnection.createChannel).toHaveBeenCalled()
  expect(mockedChannel.assertQueue).toHaveBeenCalledWith(Queue.Logging, {
    ...DEFAULT_QUEUE_OPTIONS,
    myOption: 'test'
  })
  expect(mockedChannel.assertExchange).toHaveBeenCalledWith(
    EventMessage.LogLogged,
    DEFAULT_EXCHANGE_TYPE,
    DEFAULT_EXCHANGE_OPTIONS
  )
  expect(mockedChannel.bindQueue).toHaveBeenCalledWith(
    Queue.Logging,
    EventMessage.LogLogged,
    DEFAULT_BIND_PATTERN
  )
})

test('start', async () => {
  const microservice = new PlatformMicroserviceImpl(Queue.Logging)

  await microservice.start()

  expect(mockedListen).toHaveBeenCalled()
})
