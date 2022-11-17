/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { LogLoggedMessage } from '@carbon-platform/api/logging'
import { getEnvVar, RunMode, Runtime } from '@carbon-platform/api/runtime'
import LogDna, { Logger } from '@logdna/logger'
import { Injectable } from '@nestjs/common'

/**
 * An injectable service that talks directly to the LogDNA ingestion endpoint and can transmit log
 * data to it.
 */
@Injectable()
class LogDnaService {
  public readonly logDnaLogger?: Logger

  constructor(runtime: Runtime) {
    const CARBON_LOGDNA_ENDPOINT = getEnvVar(
      runtime,
      'CARBON_LOGDNA_ENDPOINT',
      'https://logs.us-south.logging.cloud.ibm.com/logs/ingest'
    )

    const CARBON_LOGDNA_KEY = getEnvVar(runtime, 'CARBON_LOGDNA_KEY')

    if (runtime.runMode === RunMode.Standard) {
      this.logDnaLogger = LogDna.createLogger(CARBON_LOGDNA_KEY, {
        url: CARBON_LOGDNA_ENDPOINT,
        env: runtime.runMode
      })
    }
  }

  /**
   * Logs the provided log entry on the LogDNA server.
   *
   * **NOTE:** In "Dev" run-mode, this is effectively a no-op.
   *
   * @param logEntry The log to send to LogDNA.
   */
  public log(logEntry: LogLoggedMessage) {
    this.logDnaLogger?.log(String(logEntry.message), {
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
