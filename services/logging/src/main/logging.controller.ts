/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { LogLoggedMessage } from '@carbon-platform/api/logging'
import { Nest, PlatformController, Validate } from '@carbon-platform/api/microservice'
import { getEnvironment } from '@carbon-platform/api/runtime'

import { LogDnaService } from './log-dna.service'
import { logMessageValidator } from './log-message-validator'

@Nest.Controller()
class LoggingController extends PlatformController {
  private readonly logDnaService: LogDnaService

  constructor(logDnaService: LogDnaService) {
    super()
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
  @Nest.EventPattern('log_logged')
  @Validate(logMessageValidator)
  public async logLogged(@Nest.Payload() data: LogLoggedMessage) {
    this.nestLogger.log(`-> logLogged(${JSON.stringify(data)})`)

    this.logDnaService.log(data)
  }
}

export { LoggingController }
