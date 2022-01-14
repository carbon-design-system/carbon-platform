/*
 * Copyright IBM Corp. 2021, 2021
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

abstract class PlatformMicroservice {
  private readonly queueName: Queue
  private readonly queueOptions: any

  constructor(queueName: Queue, queueOptions?: any) {
    this.queueName = queueName
    this.queueOptions = {
      ...DEFAULT_QUEUE_OPTIONS,
      ...queueOptions
    }
  }

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
