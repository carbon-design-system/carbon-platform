/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {
  DEFAULT_BIND_PATTERN,
  DEFAULT_EXCHANGE_OPTIONS,
  DEFAULT_EXCHANGE_TYPE,
  DEFAULT_QUEUE_OPTIONS,
  EventMessage,
  MESSAGE_QUEUE_URL,
  QueryMessage,
  Queue
} from '@carbon-platform/api/messaging'
import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import amqp from 'amqplib'

const CONNECT_RETRY_INTERVAL = 5000

/**
 * An abstract class that wraps much of the boilerplate code needed to create, bind, and start a
 * Carbon Platform microservice.
 */
abstract class PlatformMicroservice {
  private readonly queueName: Queue
  private readonly queueOptions: any

  /**
   * Constructs a new microservice that consumes messages from the specified queue.
   *
   * @param queueName The name of the queue from which to consume messages.
   * @param queueOptions An optional set of options for the queue, such as explicit message
   * acknowledgement or queue durability.
   */
  constructor(queueName: Queue, queueOptions?: any) {
    this.queueName = queueName
    this.queueOptions = {
      ...DEFAULT_QUEUE_OPTIONS,
      ...queueOptions
    }
  }

  /**
   * Connects to the RabbitMQ server.
   *
   * @returns A connection to the RabbitMQ server.
   */
  private async connect(): Promise<amqp.Connection> {
    while (true) {
      try {
        return await amqp.connect(MESSAGE_QUEUE_URL)
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
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(this.constructor, {
      transport: Transport.RMQ,
      options: {
        urls: [MESSAGE_QUEUE_URL],
        queue: this.queueName,
        queueOptions: this.queueOptions
      }
    })

    return app.listen()
  }

  /**
   * Binds a service to one or more message types, allowing it to listen for and receive messages of
   * those types.
   *
   * This is accomplished by connecting to RabbitMQ, asserting a queue for the one specified in the
   * constructor, asserting an exchange for each message type, binding the queue to the newly
   * asserted exchanges, and then disconnecting from RabbitMQ.
   *
   * @param messageTypes The types of messages to which to bind.
   */
  public async bind(...messageTypes: Array<EventMessage | QueryMessage>) {
    const connection = await this.connect()
    const channel = await connection.createChannel()

    await channel.assertQueue(this.queueName, this.queueOptions)

    for (const messageType of messageTypes) {
      const exchange = messageType as string
      await channel.assertExchange(exchange, DEFAULT_EXCHANGE_TYPE, DEFAULT_EXCHANGE_OPTIONS)
      await channel.bindQueue(this.queueName, exchange, DEFAULT_BIND_PATTERN)
    }

    await channel.close()
    await connection.close()
  }
}

export { PlatformMicroservice }
