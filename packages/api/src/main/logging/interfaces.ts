/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Environment } from '../runtime'

type LogLevel = 'debug' | 'info' | 'warn' | 'error'

interface LogLoggedMessage {
  component: string
  environment: Environment
  level: LogLevel
  message: any
  service: string
  timestamp: number
}

export type { LogLevel, LogLoggedMessage }
