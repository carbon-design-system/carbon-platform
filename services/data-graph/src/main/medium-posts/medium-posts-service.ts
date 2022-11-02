/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { MediumPost } from '@carbon-platform/api/data-graph'
import { Injectable } from '@nestjs/common'

@Injectable()
class MediumPostsService {
  getPosts(): MediumPost[] {
    // TODO: I think this calls the microservice, resolve params? @joe
    return []
  }
}

export { MediumPostsService }
