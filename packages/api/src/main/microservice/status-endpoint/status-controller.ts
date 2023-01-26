/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Controller, Get, HttpCode } from '@nestjs/common'

import { Trace } from '../../logging/decorators/trace.js'

@Controller()
class StatusController {
  @Trace()
  @Get('readiness')
  @HttpCode(204)
  public getReadiness() {
    return null
  }
}

export { StatusController }
