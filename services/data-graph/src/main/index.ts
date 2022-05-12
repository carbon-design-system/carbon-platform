/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { QueryMessage, Queue } from '@carbon-platform/api/dist/main/messaging'
import { PlatformMicroservice } from '@carbon-platform/api/microservice'

// import { NestFactory } from '@nestjs/core'
// import { GraphQLSchemaHost } from '@nestjs/graphql'
// import { gql } from 'apollo-server-express'
// import { execute, graphql } from 'graphql'
import { DataGraphModule } from './data-graph-module'

async function start() {
  const pm = new PlatformMicroservice({
    queue: Queue.DataGraph,
    module: DataGraphModule
  })

  pm.bind<QueryMessage>('data_graph')

  await pm.start()

  // const app = await NestFactory.create(DataGraphModule)
  // await app.init() // Forces schema host initialization

  // const { schema } = app.get(GraphQLSchemaHost)

  // console.log(schema.)

  // const query = gql`
  //   query MyQuery {
  //     user(id: 1) {
  //       name
  //     }
  //   }
  // `

  // const result = await execute({ schema, document: query })
  // const result = await graphql({ schema, source: '{user(id: 1)}' })
  // console.log('***', result.data?.asd)
  // console.log(JSON.stringify(result))

  // await app.listen(3000)
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
