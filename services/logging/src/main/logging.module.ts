/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Nest, PlatformMicroservice } from '@carbon-platform/api/microservice'

import { LogDnaService } from './log-dna.service'
import { LoggingController } from './logging.controller'

@Nest.Module({
  controllers: [LoggingController],
  providers: [LogDnaService]
})
class LoggingModule extends PlatformMicroservice {}

export { LoggingModule }
