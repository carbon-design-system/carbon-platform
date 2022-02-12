/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { NestFactory } from '@nestjs/core'
import { GraphQLSchemaHost } from '@nestjs/graphql'
import { gql } from 'apollo-server-express'
import { execute } from 'graphql'

import { AppModule } from './app.module'

async function start() {
  const app = await NestFactory.create(AppModule)
  await app.init() // Forces schema host initialization

  const { schema } = app.get(GraphQLSchemaHost)

  const query = gql`
    query MyQuery {
      user(id: 1) {
        name
      }
    }
  `

  console.log(JSON.stringify(query))

  const result = await execute({ schema: schema, document: query })
  console.log(JSON.stringify(result))

  await app.listen(3000)
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

start()
