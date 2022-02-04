/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { LogLoggedMessage } from '@carbon-platform/api/logging'
import { getRunMode, RunMode } from '@carbon-platform/api/runtime'
import LogDna, { Logger } from '@logdna/logger'
import { Injectable } from '@nestjs/common'

import { CARBON_LOGDNA_ENDPOINT, CARBON_LOGDNA_KEY } from './constants'

/**
 * An injectable service that talks directly to the LogDNA ingestion endpoint and can transmit log
 * data to it.
 */
@Injectable()
class LogDnaService {
  private readonly logDna?: Logger

  constructor() {
    // In DEV mode, the service is a no-op
    if (getRunMode() === RunMode.Prod) {
      this.logDna = LogDna.createLogger(CARBON_LOGDNA_KEY, {
        url: CARBON_LOGDNA_ENDPOINT,
        env: getRunMode()
      })
    }
  }

  /**
   * Logs the provided log entry on the LogDNA server.
   *
   * **NOTE:** In DEV run-mode, this is effectively a no-op.
   *
   * @param logEntry The log to send to LogDNA.
   */
  public log(logEntry: LogLoggedMessage) {
    this.logDna?.log(logEntry.message, {
      app: 'service:' + logEntry.service,
      env: logEntry.environment,
      indexMeta: true,
      level: logEntry.level,
      meta: {
        component: logEntry.component
      },
      timestamp: logEntry.timestamp
    })
  }
}

export { LogDnaService }
