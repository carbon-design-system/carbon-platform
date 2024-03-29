/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Environment } from '../runtime/index.js'

type LogLevel = 'debug' | 'info' | 'warn' | 'error'

type Loggable = string | number | boolean | Array<unknown> | Record<string, unknown> | Error

interface LogLoggedMessage {
  component: string
  environment: Environment
  level: LogLevel
  message: unknown
  service: string
  timestamp: number
}

export type { Loggable, LogLevel, LogLoggedMessage }
