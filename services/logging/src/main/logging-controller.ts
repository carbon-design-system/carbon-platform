/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { LogLoggedMessage, Trace } from '@carbon-platform/api/logging'
import { UnvalidatedMessage } from '@carbon-platform/api/messaging'
import { Runtime } from '@carbon-platform/api/runtime'
import { Controller } from '@nestjs/common'
import { EventPattern, Payload } from '@nestjs/microservices'

import { LogDnaService } from './log-dna-service.js'
import { validateLogMessage } from './validate-log-message.js'

@Controller()
class LoggingController {
  private readonly logDnaService: LogDnaService

  private logMessagePartial = {
    service: 'logging',
    component: 'logging.controller',
    // TODO: This is bad and should be injected at a higher level or obtained from a config
    // service
    environment: new Runtime().environment
  }

  constructor(logDnaService: LogDnaService) {
    this.logDnaService = logDnaService

    // This is only needed since this is the logging service. Other services would just call
    // `logging.info` directly.
    this.logDnaService.log({
      ...this.logMessagePartial,
      level: 'info',
      timestamp: Date.now(),
      message: 'Logging controller successfully instantiated'
    })
  }

  /**
   * Handles incoming log messages and writes them to the LogDNA endpoint.
   *
   * @param data The log message to log.
   */
  @Trace()
  @EventPattern('log_logged')
  public logLogged(@Payload() data: UnvalidatedMessage<LogLoggedMessage>) {
    // This type of explicit catching of the error thrown by validateLogMessage is only needed
    // because the logging service disables remote logging to prevent infinite messaging loops.
    try {
      const logMessage = validateLogMessage(data)

      this.logDnaService.log(logMessage)
    } catch (err) {
      if (err instanceof Error) {
        this.logDnaService.log({
          ...this.logMessagePartial,
          level: 'warn',
          timestamp: Date.now(),
          message: err.message
        })
      }
    }
  }
}

export { LoggingController }
