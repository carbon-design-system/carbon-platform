/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { StatusController } from '@carbon-platform/api/microservice'
import { getRunMode, RunMode } from '@carbon-platform/api/runtime'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'

import { SCHEMA_OUTPUT_FILE } from './constants'
import { DataGraphController } from './data-graph-controller'
import { LibrariesModule } from './libraries/libraries-module'
import { RequestLogPlugin } from './request-log-plugin'
import { UsersModule } from './users/users-module'

@Module({
  controllers: [StatusController, DataGraphController],
  imports: [
    // Resolver modules
    LibrariesModule,
    UsersModule,

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // Output the schema as a file in dev mode; or store it in memory otherwise
      autoSchemaFile: getRunMode() === RunMode.Dev ? SCHEMA_OUTPUT_FILE : true,
      playground: getRunMode() === RunMode.Dev
    })
  ],
  providers: [RequestLogPlugin]
})
export class DataGraphModule {}
