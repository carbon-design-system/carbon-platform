/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'

import { UserModule } from './modules/user/user.module'

@Module({
  imports: [
    UserModule,
    GraphQLModule.forRoot({
      autoSchemaFile: true
    })
  ]
})
export class AppModule {}
