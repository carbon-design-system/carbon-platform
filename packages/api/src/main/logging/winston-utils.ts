/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { format } from 'logform'
import { createLogger, Logger, transports } from 'winston'

import { DEV, RunMode } from '../run-mode'

const consoleFormat = format.combine(
  format.colorize(),
  format.timestamp(),
  format.printf(
    ({ timestamp, label, level, message }) => `${timestamp} [${label}] ${level}: ${message}`
  )
)

let winstonLogger: Logger | null = null

function getWinstonLogger(runMode: RunMode): Logger {
  if (!winstonLogger) {
    winstonLogger = createWinstonLogger(runMode)
  }

  return winstonLogger
}

function createWinstonLogger(runMode: RunMode) {
  let maxLogLevel = 'info'

  if (runMode === DEV) {
    maxLogLevel = 'debug'
  }

  return createLogger({
    level: maxLogLevel,
    transports: [
      new transports.Console({
        format: consoleFormat,
        consoleWarnLevels: ['warn'],
        stderrLevels: ['error']
      })
      // TODO: add messaging transport if running in test or production
    ]
  })
}

export { getWinstonLogger }
