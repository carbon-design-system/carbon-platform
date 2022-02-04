/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Module } from '@nestjs/common'

import { PlatformMicroservice } from './common/platform-microservice'
import { LogDnaService } from './log-dna.service'
import { LoggingController } from './logging.controller'

@Module({
  controllers: [LoggingController],
  providers: [LogDnaService]
})
class LoggingModule extends PlatformMicroservice {}

export { LoggingModule }
