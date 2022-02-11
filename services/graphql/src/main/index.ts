/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { NestFactory } from '@nestjs/core'
import { GraphQLSchemaHost } from '@nestjs/graphql'
import { graphql } from 'graphql'

import { AppModule } from './app.module'

async function bootstrap() {
  // const client = MessagingClient.getInstance()

  // await client.bind(Queue.GraphQL, DEFAULT_QUEUE_OPTIONS, QueryMessage.GraphqlQuery)

  // const microservice = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: [CARBON_MESSAGE_QUEUE_URL],
  //     queue: Queue.GraphQL,
  //     queueOptions: DEFAULT_QUEUE_OPTIONS
  //   }
  // })

  // microservice.listen()

  const app = await NestFactory.create(AppModule)
  app.listen(3000, async () => {
    const { schema } = app.get(GraphQLSchemaHost)
    console.log(schema)
    const result = await graphql(
      schema,
      `
        {
          users {
            id
          }
        }
      `
    )
    console.log(JSON.stringify(result))
  })

  // ---- TESTING -----
  // console.log(`Application is running on: ${await app.getUrl()}`)

  // setTimeout(() => {
  //   console.log('sending query')

  //   const queryType = QueryMessage.GraphqlQuery

  //   client
  //     .query(queryType, {
  //       queryName: 'user',
  //       query: 'query{user(id: 2){name, email, id}}'
  //     })
  //     .then((res) => {
  //       console.log('promised resolved', res)
  //     })
  // }, 1000)
}

bootstrap()
