/*
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { StatusController } from '@carbon-platform/api/microservice'
import { Module } from '@nestjs/common'

import { LogDnaService } from './log-dna-service.js'
import { LoggingController } from './logging-controller.js'

@Module({
  controllers: [LoggingController, StatusController],
  providers: [LogDnaService]
})
class LoggingModule {}

export { LoggingModule }
