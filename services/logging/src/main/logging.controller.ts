/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { LogLoggedMessage } from '@carbon-platform/api/logging'
import { Trace, Validate } from '@carbon-platform/api/microservice'
import { getEnvironment } from '@carbon-platform/api/runtime'
import { Controller } from '@nestjs/common'
import { EventPattern, Payload } from '@nestjs/microservices'

import { LogDnaService } from './log-dna.service'
import { logMessageValidator } from './log-message-validator'

@Controller()
class LoggingController {
  private readonly logDnaService: LogDnaService

  constructor(logDnaService: LogDnaService) {
    this.logDnaService = logDnaService

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
  @Trace() // TODO: make sure this still works
  @Validate(logMessageValidator)
  public async logLogged(@Payload() data: LogLoggedMessage) {
    this.logDnaService.log(data)
  }
}

export { LoggingController }
