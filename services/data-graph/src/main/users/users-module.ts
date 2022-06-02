/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Module } from '@nestjs/common'

import { UsersResolver } from './users-resolver'
import { UsersService } from './users-service'

@Module({ providers: [UsersResolver, UsersService] })
class UsersModule {}

export { UsersModule }
