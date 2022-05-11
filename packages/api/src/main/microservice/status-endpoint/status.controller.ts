/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Controller, Get, HttpCode, UseInterceptors } from '@nestjs/common'

import { RequestLogInterceptor } from '../'
import { Trace } from '../decorators/trace'

@UseInterceptors(RequestLogInterceptor)
@Controller()
class StatusController {
  @Get('liveness')
  @HttpCode(204)
  @Trace()
  public liveness() {
    return null
  }

  @Get('readiness')
  @HttpCode(204)
  @Trace()
  public readiness() {
    return null
  }
}

export { StatusController }
