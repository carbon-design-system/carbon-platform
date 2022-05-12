/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as runtime from '@carbon-platform/api/runtime'
import logDna from '@logdna/logger'

import { LogDnaService } from '../main/log-dna-service'

jest.mock('@logdna/logger')
const mockedLogDna = logDna as jest.Mocked<typeof logDna>

jest.mock('@carbon-platform/api/runtime', () => ({
  getRunMode: jest.fn(() => runtime.RunMode.Standard),
  loadEnvVars: jest.fn(() => ({ CARBON_LOGDNA_ENDPOINT: 'fake test endpoint' })),
  RunMode: {
    Standard: 'STANDARD'
  }
}))

test('service creates a LogDna logger in "Standard" mode', () => {
  const mockedLogger = {
    log: jest.fn()
  }

  mockedLogDna.createLogger.mockReturnValue(mockedLogger as any)

  const logDnaService = new LogDnaService()
  logDnaService.log({} as any)

  expect(mockedLogDna.createLogger).toHaveBeenCalled()
  expect(mockedLogger.log).toHaveBeenCalled()
})
