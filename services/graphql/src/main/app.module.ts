/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'

import { MyCoolQueryResolver } from './my-cool-query/my-cool-query.resolver'
import { UsersResolver } from './users/users.resolver'
import { UserService } from './users/users.service'

@Module({
  providers: [
    // Services
    UserService,

    // Resolvers
    MyCoolQueryResolver,
    UsersResolver
  ],
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true
    })
  ]
})
export class AppModule {}
