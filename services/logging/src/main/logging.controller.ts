/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Logging, LogLoggedMessage } from '@carbon-platform/api/logging'
import { Trace, Validate } from '@carbon-platform/api/microservice'
import { getEnvironment } from '@carbon-platform/api/runtime'
import { Controller } from '@nestjs/common'
import { EventPattern, Payload } from '@nestjs/microservices'

import { LogDnaService } from './log-dna.service'
import { logMessageValidator } from './log-message-validator'

@Controller()
class LoggingController {
  private readonly logDnaService: LogDnaService
  private readonly logging: Logging

  constructor(logDnaService: LogDnaService) {
    this.logDnaService = logDnaService
    // Set up a logger, but turn off remote logging since this is the logging service itself
    this.logging = new Logging('logging.controller', { isRemoteLoggingEnabled: false })

    this.logDnaService.log({
      service: 'logging',
      component: 'logging.controller',
      environment: getEnvironment(),
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
  @EventPattern('log_logged')
  @Trace()
  @Validate(logMessageValidator)
  public async logLogged(@Payload() data: LogLoggedMessage) {
    this.logDnaService.log(data)
  }
}

export { LoggingController }
