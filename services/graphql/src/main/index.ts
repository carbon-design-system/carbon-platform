/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {
  CARBON_MESSAGE_QUEUE_URL,
  DEFAULT_QUEUE_OPTIONS,
  MessagingClient,
  QueryMessage,
  Queue
} from '@carbon-platform/api/messaging'
import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'

import { AppModule } from './app.module'

async function bootstrap() {
  const client = MessagingClient.getInstance()

  const queueOptions = {
    ...DEFAULT_QUEUE_OPTIONS
  }
  await client.bind(Queue.GraphQL, queueOptions, QueryMessage.GraphqlQuery)

  const microservice = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [CARBON_MESSAGE_QUEUE_URL],
      queue: Queue.GraphQL,
      queueOptions
    }
  })

  microservice.listen()

  const app = await NestFactory.create(AppModule)
  await app.listen(3000)

  // ---- TESTING -----
  console.log(`Application is running on: ${await app.getUrl()}`)

  setTimeout(() => {
    console.log('sending query')

    const queryType = QueryMessage.GraphqlQuery

    client
      .query(queryType, {
        queryName: 'user',
        query: 'query{user(id: 2){name, email, id}}'
      })
      .then((res) => {
        console.log('promised resolved', res)
      })
  }, 1000)
}
bootstrap()
