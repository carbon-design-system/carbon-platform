/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Library } from '@carbon-platform/api/data-graph'
import { Trace } from '@carbon-platform/api/logging'
import { Query, Resolver } from '@nestjs/graphql'

import { LibrariesService } from './libraries-service.js'

@Resolver()
class LibrariesResolver {
  private readonly librariesService: LibrariesService

  constructor(librariesService: LibrariesService) {
    this.librariesService = librariesService
  }

  @Trace()
  @Query(() => [Library])
  libraries(): Library[] {
    return this.librariesService.findAll()
  }
}

export { LibrariesResolver }
