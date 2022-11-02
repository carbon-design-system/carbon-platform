/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { MediumPost } from '@carbon-platform/api/data-graph'
import { Trace } from '@carbon-platform/api/logging'
import { Query, Resolver } from '@nestjs/graphql'

import { MediumPostsService } from './medium-posts-service.js'

@Resolver()
class MediumPostsResolver {
  private readonly mediumPostsService: MediumPostsService

  constructor(mediumPostsService: MediumPostsService) {
    this.mediumPostsService = mediumPostsService
  }

  // TODO: args??

  @Trace()
  @Query(() => [MediumPost])
  mediumPosts(): MediumPost[] {
    return this.mediumPostsService.getPosts()
  }
}

export { MediumPostsResolver }
