/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { UnvalidatedMessage } from '@carbon-platform/api/messaging'
import { RequestLogInterceptor, Trace } from '@carbon-platform/api/microservice'
import { getEnvironment } from '@carbon-platform/api/runtime'
import { Controller, UseInterceptors } from '@nestjs/common'
import { EventPattern, Payload } from '@nestjs/microservices'

import { LogDnaService } from './log-dna.service'
import { validateLogMessage } from './log-message-validator'

@UseInterceptors(RequestLogInterceptor)
@Controller()
class LoggingController {
  private readonly logDnaService: LogDnaService

  constructor(logDnaService: LogDnaService) {
    this.logDnaService = logDnaService

    // This is only needed since this is the logging service. Other services would just call
    // `logging.info` directly.
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
  @Trace()
  @EventPattern('log_logged')
  public logLogged(@Payload() data: UnvalidatedMessage) {
    const logMessage = validateLogMessage(data)

    this.logDnaService.log(logMessage)
  }
}

export { LoggingController }
