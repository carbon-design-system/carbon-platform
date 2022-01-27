/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Logger } from 'winston'

import { getRunMode } from '../run-mode'
import { getWinstonLogger } from './winston-utils'

class Logging {
  private component: string
  private winstonLogger: Logger

  constructor(component: string, winstonLogger?: Logger) {
    this.component = component
    this.winstonLogger = winstonLogger || getWinstonLogger(getRunMode())
  }

  public async debug(message: string) {
    this.winstonLogger.debug({ label: this.component, message })
  }

  public async info(message: string) {
    this.winstonLogger.info({ label: this.component, message })
  }

  public async warn(message: string) {
    this.winstonLogger.warn({ label: this.component, message })
  }

  public async error(message: string) {
    this.winstonLogger.error({ label: this.component, message })
  }
}

export { Logging }
