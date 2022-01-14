/*
 * Copyright IBM Corp. 2022, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as runMode from '@carbon-platform/api/run-mode'
import logDna from '@logdna/logger'

import { LogDnaService } from '../main/log-dna.service'

jest.mock('@logdna/logger')
const mockedLogDna = logDna as jest.Mocked<typeof logDna>

jest.mock('@carbon-platform/api/run-mode')
const mockedRunMode = runMode as jest.Mocked<typeof runMode>

test('service creates a LogDna logger in PROD mode', () => {
  const mockedLogger = {
    log: jest.fn()
  }

  mockedRunMode.getRunMode.mockReturnValue(runMode.PROD)
  mockedLogDna.createLogger.mockReturnValue(mockedLogger as any)

  const logDnaService = new LogDnaService()
  logDnaService.log({} as any)

  expect(mockedLogDna.createLogger).toHaveBeenCalled()
  expect(mockedLogger.log).toHaveBeenCalled()
})
