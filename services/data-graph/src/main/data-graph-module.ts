/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { StatusController } from '@carbon-platform/api/microservice'
import { RunMode, Runtime } from '@carbon-platform/api/runtime'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { DynamicModule, Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'

import { SCHEMA_OUTPUT_FILE } from './constants.js'
import { DataGraphController } from './data-graph-controller.js'
import { LibrariesModule } from './libraries/libraries-module.js'
import { RequestLogPlugin } from './request-log-plugin.js'
import { UsersModule } from './users/users-module.js'

@Module({})
class DataGraphModule {
  static register(runtime: Runtime): DynamicModule {
    return {
      controllers: [StatusController, DataGraphController],
      imports: [
        // Resolver modules
        LibrariesModule,
        UsersModule,

        GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
          // Output the schema as a file in dev mode; or store it in memory otherwise
          autoSchemaFile: runtime.runMode === RunMode.Dev ? SCHEMA_OUTPUT_FILE : true,
          playground: runtime.runMode === RunMode.Dev
        })
      ],
      providers: [RequestLogPlugin],
      module: DataGraphModule
    }
  }
}

export { DataGraphModule }
