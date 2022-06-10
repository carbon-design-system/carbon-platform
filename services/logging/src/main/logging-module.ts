/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { StatusController } from '@carbon-platform/api/microservice'
import { RunMode, Runtime } from '@carbon-platform/api/runtime'
import LogDna, { Logger } from '@logdna/logger'
import { Module } from '@nestjs/common'

import { CARBON_LOGDNA_ENDPOINT, CARBON_LOGDNA_KEY } from './constants.js'
import { LogDnaService } from './log-dna-service.js'
import { LoggingController } from './logging-controller.js'

@Module({
  controllers: [LoggingController, StatusController],
  providers: [
    {
      provide: LogDnaService,
      useFactory: () => {
        const runtime = new Runtime()
        let logDnaLogger: Logger | undefined

        if (runtime.runMode === RunMode.Standard) {
          logDnaLogger = LogDna.createLogger(CARBON_LOGDNA_KEY, {
            url: CARBON_LOGDNA_ENDPOINT,
            env: runtime.runMode
          })
        }

        return new LogDnaService({ logDnaLogger })
      }
    }
  ]
})
class LoggingModule {}

export { LoggingModule }
