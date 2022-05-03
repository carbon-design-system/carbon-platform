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
  Queue
} from '../../main/messaging'
import { PlatformMicroservice } from '../../main/microservice'
import { getEnvironment, withEnvironment } from '../../main/runtime'

jest.mock('amqplib')
jest.mock('@nestjs/core')

const mockedAmqplib = amqplib as jest.Mocked<typeof amqplib>
const mockedNestFactory = NestFactory as jest.Mocked<typeof NestFactory>

class PlatformMicroserviceImpl extends PlatformMicroservice {}

let mockedChannel: any = null
let mockedConnection: any = null
const mockedLivenessListen = jest.fn()
const mockedMicroserviceListen = jest.fn()

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

  mockedNestFactory.create.mockResolvedValue({
    listen: mockedLivenessListen
  } as any)
  mockedNestFactory.createMicroservice.mockResolvedValue({
    listen: mockedMicroserviceListen
  } as any)
})

test('bind', async () => {
  const fullQueueName = `${getEnvironment()}_${Queue.Logging}`
  const microservice = new PlatformMicroserviceImpl(Queue.Logging, { myOption: 'test' })

  await microservice.bind('null', 'ping')

  expect(mockedAmqplib.connect).toHaveBeenCalled()
  expect(mockedConnection.createChannel).toHaveBeenCalled()
  expect(mockedChannel.assertQueue).toHaveBeenCalledWith(fullQueueName, {
    ...DEFAULT_QUEUE_OPTIONS,
    myOption: 'test'
  })
  expect(mockedChannel.assertExchange).toHaveBeenCalledWith(
    withEnvironment('null'),
    DEFAULT_EXCHANGE_TYPE,
    DEFAULT_EXCHANGE_OPTIONS
  )
  expect(mockedChannel.assertExchange).toHaveBeenCalledWith(
    withEnvironment('ping'),
    DEFAULT_EXCHANGE_TYPE,
    DEFAULT_EXCHANGE_OPTIONS
  )
  expect(mockedChannel.bindQueue).toHaveBeenCalledWith(
    fullQueueName,
    withEnvironment('null'),
    DEFAULT_BIND_PATTERN
  )
  expect(mockedChannel.bindQueue).toHaveBeenCalledWith(
    fullQueueName,
    withEnvironment('ping'),
    DEFAULT_BIND_PATTERN
  )
})

test('start', async () => {
  const microservice = new PlatformMicroserviceImpl(Queue.Logging)

  await microservice.start()

  expect(mockedLivenessListen).toHaveBeenCalled()
  expect(mockedMicroserviceListen).toHaveBeenCalled()
})
