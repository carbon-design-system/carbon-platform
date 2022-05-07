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

import { LibrariesResolver } from './libraries/libraries.resolver'
import { LibrariesService } from './libraries/libraries.service'
import { UsersResolver } from './users/users.resolver'
import { UsersService } from './users/users.service'

@Module({
  controllers: [StatusController],
  providers: [
    // Services
    UsersService,
    LibrariesService,

    // Resolvers
    LibrariesResolver,
    UsersResolver
  ],
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // Output the schema as a file in dev mode; or store it in memory otherwise
      autoSchemaFile:
        getRunMode() === RunMode.Dev ? path.join('dist', 'data-graph.schema.gql') : true,
      playground: getRunMode() === RunMode.Dev
    })
  ]
})
export class DataGraphModule {}
