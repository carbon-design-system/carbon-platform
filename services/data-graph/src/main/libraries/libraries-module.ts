/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Module } from '@nestjs/common'

import { LibrariesResolver } from './libraries-resolver.js'
import { LibrariesService } from './libraries-service.js'

@Module({ providers: [LibrariesResolver, LibrariesService] })
class LibrariesModule {}

export { LibrariesModule }
