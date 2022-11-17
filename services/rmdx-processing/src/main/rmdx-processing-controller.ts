/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Logging, Trace } from '@carbon-platform/api/logging'
import { UnvalidatedMessage } from '@carbon-platform/api/messaging'
import { RmdxMessage, RmdxResponse } from '@carbon-platform/api/rmdx'
import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'

import { RmdxService } from './rmdx-service.js'
import { validateRmdxMessage } from './validate-rmdx-message.js'

@Controller()
class RmdxProcessingController {
  private readonly rmdxService: RmdxService
  private readonly logging: Logging

  constructor(rmdxService: RmdxService) {
    this.rmdxService = rmdxService
    this.logging = new Logging({
      component: 'RmdxProcessingController'
    })

    this.logging.info('RmdxProcessingController successfully instantiated')
  }

  /**
   * Handles incoming requests for RMDX ASTs and associated data.
   *
   * @param data Message containing the source MDX.
   */
  @Trace()
  @MessagePattern('rmdx')
  public queryRmdx(@Payload() data: UnvalidatedMessage<RmdxMessage>): RmdxResponse {
    validateRmdxMessage(data)

    // TODO
    return {} as RmdxResponse
  }
}

export { RmdxProcessingController }
