/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { DynamicModule } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
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
import { RootApplicationModule } from './root-application.module'
import { StatusController } from './status-endpoint/status.controller'

type BindableMessage = EventMessage | QueryMessage

type BindableMessageKey<T extends BindableMessage> = T extends EventMessage
  ? keyof EventMessage
  : keyof QueryMessage

interface ServiceConfig {
  queue: Queue
  messagingOptions?: {
    noAck?: boolean
  }
  restApiController?: any
}

interface MessagingOptions {
  noAck?: boolean
}

/**
 * An abstract class that wraps much of the boilerplate code needed to create, bind, and start a
 * Carbon Platform microservice.
 */
abstract class PlatformMicroservice {
  private readonly queueName: string
  private readonly configOptions: MessagingOptions
  private readonly restApiController?: any

  /**
   * Constructs a new microservice that consumes messages from the specified queue.
   *
   * @param params Configuration parameters for the microservice.
   * @param params.queue The name of the queue from which to consume messages (from the Queue enum).
   * @param params.messagingOptions An optional set of options for AMQP, such as explicit message
   * acknowledgement or queue durability.
   * @param params.restApiController An optional NestJS Controller to act as a public-facing REST
   * API handler for this microservice.
   */
  constructor({ queue, messagingOptions = {}, restApiController }: ServiceConfig) {
    // Use a queue name that is environment-specific
    this.queueName = withEnvironment(queue)
    this.configOptions = messagingOptions
    this.restApiController = restApiController
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
   * Starts the application listening for incoming messages.
   *
   * **NOTE:** This method does not return.
   */
  public async start(): Promise<any> {
    const microservice = await NestFactory.createMicroservice<RmqOptions>(this.constructor, {
      transport: Transport.RMQ,
      options: {
        // Default to noAck=false (explicit acks required to remove entries from the queue)
        noAck: this.configOptions.noAck,
        socketOptions: DEFAULT_SOCKET_OPTIONS,
        queue: this.queueName,
        queueOptions: DEFAULT_QUEUE_OPTIONS,
        urls: [CARBON_MESSAGE_QUEUE_URL]
      }
    })

    const controllers = this.restApiController
      ? [StatusController, this.restApiController]
      : [StatusController]

    const rootApplication = await NestFactory.create({
      module: RootApplicationModule,
      controllers
    } as DynamicModule)

    return Promise.all([microservice.listen(), rootApplication.listen(PORT)])
  }

  /**
   * Binds a service to one or more message types, allowing it to listen for and receive messages of
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
}

export { PlatformMicroservice }
