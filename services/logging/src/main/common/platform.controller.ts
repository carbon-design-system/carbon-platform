/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Logger } from '@nestjs/common'

/**
 * A base class for other Carbon Platform NestJS controllers that automatically instantiates a
 * NestJS logger with an appropriate name that can be used by child classes.
 */
class PlatformController {
  public readonly nestLogger: Logger

  constructor() {
    this.nestLogger = new Logger(this.constructor.name)
  }
}

export { PlatformController }
