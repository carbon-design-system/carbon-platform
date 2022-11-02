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

import { MediumService } from './medium-service.js'

@Controller()
class BlogController {
  private readonly mediumService: MediumService

  constructor(mediumService: MediumService) {
    this.mediumService = mediumService
  }

  /**
   * Handles incoming log messages and writes them to the LogDNA endpoint.
   *
   * @param data The log message to log.
   */
  // @Trace()
  // @EventPattern('log_logged')
  // public logLogged(@Payload() data: UnvalidatedMessage<LogLoggedMessage>) {

  // }
}

export { BlogController }
