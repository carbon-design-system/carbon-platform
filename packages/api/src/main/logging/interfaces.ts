/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Environment } from '../runtime'

type LogLevel = 'debug' | 'info' | 'warn' | 'error'

type Loggable = string | number | boolean | Array<any> | Object | Error

interface LoggingOptions {
  /**
   * The name of the service under which this instance should create logs. If not specified, this
   * will default to the value obtained from the CARBON_SERVICE_NAME envvar.
   */
  serviceName?: string

  /**
   * Explicitly turns on/off remote logging. Overrides all other environment-based configuration of
   * this setting. Typically this is only used by thelogging service itself to prevent an infinite
   * loop. All other services should let this value be set to its default.
   */
  isRemoteLoggingEnabled?: boolean
}

interface LogLoggedMessage {
  component: string
  environment: Environment
  level: LogLevel
  message: any
  service: string
  timestamp: number
}

export type { Loggable, LoggingOptions, LogLevel, LogLoggedMessage }
