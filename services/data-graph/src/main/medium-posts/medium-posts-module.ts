/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Module } from '@nestjs/common'

import { MediumPostsResolver } from './medium-posts-resolver.js'
import { MediumPostsService } from './medium-posts-service.js'

@Module({ providers: [MediumPostsResolver, MediumPostsService] })
class MediumPostsModule {}

export { MediumPostsModule }
