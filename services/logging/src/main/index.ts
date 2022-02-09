/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {
  CARBON_MESSAGE_QUEUE_URL,
  DEFAULT_QUEUE_OPTIONS,
  EventMessage,
  MessagingClient,
  Queue
} from '@carbon-platform/api/messaging'
import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'

import { LoggingModule } from './logging.module'

async function start() {
  const client = MessagingClient.getInstance()

  const queueOptions = {
    ...DEFAULT_QUEUE_OPTIONS
  }

  await client.bind(Queue.Logging, queueOptions, EventMessage.LogLogged)

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(LoggingModule, {
    transport: Transport.RMQ,
    options: {
      urls: [CARBON_MESSAGE_QUEUE_URL],
      queue: Queue.Logging,
      queueOptions
    }
  })

  app.listen()
}

start()
