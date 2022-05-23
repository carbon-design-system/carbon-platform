/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { RmqOptions, Transport } from '@nestjs/microservices'
import amqp from 'amqplib'

import {
  CARBON_MESSAGE_QUEUE_URL,
  DEFAULT_BIND_PATTERN,
  DEFAULT_EXCHANGE_OPTIONS,
  DEFAULT_EXCHANGE_TYPE,
  DEFAULT_QUEUE_OPTIONS,
  DEFAULT_SOCKET_OPTIONS,
  EventMessage,
  QueryMessage,
  Queue
} from '../messaging'
import { withEnvironment } from '../runtime'
import { CONNECT_RETRY_INTERVAL, PORT } from './constants'
import { InvalidInputExceptionFilter } from './filters/invalid-input-exception-filter'
import { UncaughtExceptionFilter } from './filters/uncaught-exception-filter'
import { RequestLogInterceptor } from './interceptors/request-log-interceptor'

type BindableMessage = EventMessage | QueryMessage

type BindableMessageKey<T extends BindableMessage> = T extends EventMessage
  ? keyof EventMessage
  : keyof QueryMessage

interface MicroserviceConfig {
  /**
   * The NestJS module that defines all of the controller and providers for this microservice.
   */
  module: Function

  /**
   * Whether or not to enable automatic removal of messages from the associated queue.
   */
  autoAck?: boolean

  /**
   * The name of the queue from which to consume messages.
   */
  queue: Queue
}

class PlatformMicroservice {
  private readonly module: Function
  private readonly autoAck: boolean
  private readonly queueName: string

  constructor(config: MicroserviceConfig) {
    this.module = config.module
    this.autoAck = config.autoAck || false
    // Use a queue name that is environment-specific
    this.queueName = withEnvironment(config.queue)
  }

  /**
   * Connects to the RabbitMQ server.
   *
   * @returns A connection to the RabbitMQ server.
   */
  private async connect(): Promise<amqp.Connection> {
    while (true) {
      try {
        return await amqp.connect(CARBON_MESSAGE_QUEUE_URL, DEFAULT_SOCKET_OPTIONS)
      } catch (e) {
        console.error('Could not connect to messaging service', e)

        // Retry again after a few seconds
        await new Promise((resolve) => {
          setTimeout(resolve, CONNECT_RETRY_INTERVAL)
        })
      }
    }
  }

  /**
   * Binds a queue to one or more message types, allowing it to listen for and receive messages of
   * those types.
   *
   * This is accomplished by connecting to RabbitMQ, asserting the constructor-specified queue,
   * asserting an exchange for each message type, binding the queue to the newly asserted exchanges,
   * and then disconnecting from RabbitMQ.
   *
   * This function is generic and can optionally take either EventMessage or QueryMessage as a type
   * argument. This will narrow the scope of choices of message types for IDE auto-complete
   * purposes.
   *
   * @param messageTypes The types of messages to which to bind.
   */
  public async bind<T extends BindableMessage>(
    ...messageTypes: [BindableMessageKey<T>, ...Array<BindableMessageKey<T>>]
  ) {
    const connection = await this.connect()
    const channel = await connection.createChannel()

    await channel.assertQueue(this.queueName, DEFAULT_QUEUE_OPTIONS)

    for (const messageType of messageTypes) {
      // Use an exchange name that is environment-specific
      const exchange = withEnvironment(messageType)

      await channel.assertExchange(exchange, DEFAULT_EXCHANGE_TYPE, DEFAULT_EXCHANGE_OPTIONS)
      await channel.bindQueue(this.queueName, exchange, DEFAULT_BIND_PATTERN)
    }

    await channel.close()
    await connection.close()
  }

  /**
   * Starts the service listening for incoming messages and REST API requests.
   *
   * @returns A promise that never resolves.
   */
  public async start(): Promise<any> {
    const application = await NestFactory.create(this.module)

    const { httpAdapter } = application.get(HttpAdapterHost)

    application.useGlobalFilters(
      new InvalidInputExceptionFilter(),
      new UncaughtExceptionFilter(httpAdapter)
    )

    application.useGlobalInterceptors(new RequestLogInterceptor())

    application.connectMicroservice<RmqOptions>(
      {
        transport: Transport.RMQ,
        options: {
          noAck: this.autoAck,
          socketOptions: DEFAULT_SOCKET_OPTIONS,
          queue: this.queueName,
          queueOptions: DEFAULT_QUEUE_OPTIONS,
          urls: [CARBON_MESSAGE_QUEUE_URL]
        }
      },
      { inheritAppConfig: true }
    )

    // Invoke all initialization side effects before listening for incoming requests
    await application.init()

    await application.startAllMicroservices()
    return application.listen(PORT)
  }
}

export { PlatformMicroservice }
