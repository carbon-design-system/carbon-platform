/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { DEV } from '@carbon-platform/api/run-mode'
import winston from 'winston'

import { getWinstonLogger } from '../../main/logging/winston-utils'

test('DEV mode returns an appropriate logger', () => {
  const winstonLogger = getWinstonLogger(DEV)

  expect(winstonLogger).not.toBeNull()
  expect(winstonLogger.level).toBe('debug')
  expect(winstonLogger.transports[0]).toBeInstanceOf(winston.transports.Console)
})
