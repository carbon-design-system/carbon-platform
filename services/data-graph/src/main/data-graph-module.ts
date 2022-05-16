/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { getRunMode, RunMode } from '@carbon-platform/api/dist/main/runtime'
import { StatusController } from '@carbon-platform/api/microservice'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import path from 'path'

import { LibrariesModule } from './libraries/libraries-module'
import { RequestLogPlugin } from './request-log-plugin'
import { UsersModule } from './users/users-module'

@Module({
  controllers: [StatusController],
  imports: [
    // Resolver modules
    LibrariesModule,
    UsersModule,

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // Output the schema as a file in dev mode; or store it in memory otherwise
      autoSchemaFile:
        getRunMode() === RunMode.Dev ? path.join('dist', 'data-graph.schema.gql') : true,
      playground: getRunMode() === RunMode.Dev
    })
  ],
  providers: [RequestLogPlugin]
})
export class DataGraphModule {}
