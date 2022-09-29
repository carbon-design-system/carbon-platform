/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { StatusController } from '@carbon-platform/api/microservice'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { DynamicModule, Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'

import { DataGraphController } from './data-graph-controller.js'
import { LibrariesModule } from './libraries/libraries-module.js'
import { RequestLogPlugin } from './request-log-plugin.js'
import { UsersModule } from './users/users-module.js'

interface DataGraphModuleConfig {
  isPlaygroundEnabled: boolean
  schemaOutputFile?: string
}

@Module({})
class DataGraphModule {
  static register(config: DataGraphModuleConfig): DynamicModule {
    return {
      controllers: [StatusController, DataGraphController],
      imports: [
        // Resolver modules
        LibrariesModule,
        UsersModule,

        GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
          // Output the schema as a file in dev mode; or store it in memory otherwise
          autoSchemaFile: config.schemaOutputFile || true,
          playground: config.isPlaygroundEnabled,
          introspection: config.isPlaygroundEnabled,
          cache: 'bounded'
        })
      ],
      providers: [RequestLogPlugin],
      module: DataGraphModule
    }
  }
}

export { DataGraphModule }
