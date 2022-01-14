/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Logger } from '@nestjs/common'

class PlatformController {
  public readonly nestLogger: Logger

  constructor() {
    this.nestLogger = new Logger(this.constructor.name)
  }
}

export { PlatformController }
