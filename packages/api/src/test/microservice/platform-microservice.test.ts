/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { NestFactory } from '@nestjs/core'
import { Transport } from '@nestjs/microservices'
import amqplib from 'amqplib'

import {
  CARBON_MESSAGE_QUEUE_URL,
  DEFAULT_BIND_PATTERN,
  DEFAULT_EXCHANGE_OPTIONS,
  DEFAULT_EXCHANGE_TYPE,
  DEFAULT_QUEUE_OPTIONS,
  Queue
} from '../../main/messaging'
import { PlatformMicroservice } from '../../main/microservice'
import { PORT } from '../../main/microservice/constants'
import { getEnvironment, withEnvironment } from '../../main/runtime'

jest.mock('amqplib')
jest.mock('@nestjs/core')

const mockedAmqplib = amqplib as jest.Mocked<typeof amqplib>
const mockedNestFactory = NestFactory as jest.Mocked<typeof NestFactory>

let mockedChannel: any = null
let mockedConnection: any = null
let mockedNestApplication: any = null

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

  mockedNestApplication = {
    connectMicroservice: jest.fn(),
    listen: jest.fn(),
    startAllMicroservices: jest.fn(),
    useGlobalFilters: jest.fn(),
    useGlobalInterceptors: jest.fn()
  }

  mockedNestFactory.create.mockResolvedValue(mockedNestApplication as any)
})

test('bind', async () => {
  const fullQueueName = `${getEnvironment()}_${Queue.Logging}`
  const microservice = new PlatformMicroservice({
    module: () => null,
    queue: Queue.Logging
  })

  await microservice.bind('null', 'ping')

  expect(mockedAmqplib.connect).toHaveBeenCalled()
  expect(mockedConnection.createChannel).toHaveBeenCalled()
  expect(mockedChannel.assertQueue).toHaveBeenCalledWith(fullQueueName, DEFAULT_QUEUE_OPTIONS)
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
  const fullQueueName = `${getEnvironment()}_${Queue.Logging}`
  const mockedModule = jest.fn()

  const microservice = new PlatformMicroservice({
    module: mockedModule,
    queue: Queue.Logging
  })
  await microservice.start()

  expect(mockedNestFactory.create).toHaveBeenCalledWith(mockedModule)
  expect(mockedNestApplication.connectMicroservice).toHaveBeenCalledWith(
    {
      transport: Transport.RMQ,
      options: {
        noAck: false,
        queue: fullQueueName,
        queueOptions: {
          durable: false
        },
        socketOptions: {
          ca: []
        },
        urls: [CARBON_MESSAGE_QUEUE_URL]
      }
    },
    { inheritAppConfig: true }
  )
  expect(mockedNestApplication.startAllMicroservices).toHaveBeenCalled()
  expect(mockedNestApplication.listen).toHaveBeenCalledWith(PORT)
})
