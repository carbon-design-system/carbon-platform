/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Logging } from '../../main/logging'
import { MessagingClient } from '../../main/messaging'
import * as runMode from '../../main/run-mode'

jest.mock('../../main/run-mode')
const mockedRunMode = runMode as jest.Mocked<typeof runMode>

let mockedEmit: any

beforeEach(() => {
  mockedEmit = jest.fn()
  MessagingClient.getInstance = jest.fn().mockReturnValue({
    emit: mockedEmit
  })
})

describe('message emission', () => {
  describe('DEV mode', () => {
    beforeEach(() => {
      mockedRunMode.getRunMode.mockReturnValue(runMode.DEV)
    })

    it('does not emit any messages', async () => {
      const logging = new Logging('test-service', 'test-component')
      await logging.debug('this is a test')
      await logging.info('this is a test')
      await logging.warn('this is a test')
      await logging.error('this is a test')

      expect(mockedEmit).not.toHaveBeenCalled()
    })
  })

  describe('PROD mode', () => {
    beforeEach(() => {
      mockedRunMode.getRunMode.mockReturnValue(runMode.PROD)
    })

    it('emits one message per method call', async () => {
      const logging = new Logging('test-service', 'test-component')

      await logging.info('test')
      expect(mockedEmit).toHaveBeenCalledTimes(1)

      await logging.warn('test')
      expect(mockedEmit).toHaveBeenCalledTimes(2)

      await logging.error('test')
      expect(mockedEmit).toHaveBeenCalledTimes(3)
    })

    it('does not emit a debug log', async () => {
      const logging = new Logging('test-service', 'test-component')
      await logging.debug('test')
      expect(mockedEmit).toHaveBeenCalledTimes(0)
    })
  })
})

describe('console output', () => {
  let consoleDebug: any, consoleInfo: any, consoleWarn: any, consoleError: any

  beforeEach(() => {
    mockedRunMode.getRunMode.mockReturnValue(runMode.DEV)

    consoleDebug = console.debug
    consoleInfo = console.info
    consoleWarn = console.warn
    consoleError = console.error

    console.debug = jest.fn()
    console.info = jest.fn()
    console.warn = jest.fn()
    console.error = jest.fn()
  })

  it('calls console.debug', () => {
    const logging = new Logging('test-service', 'test-component')

    logging.debug('test')
    expect(console.debug).toHaveBeenCalledTimes(1)
    expect(console.error).not.toHaveBeenCalled()
  })

  it('calls console.info', () => {
    const logging = new Logging('test-service', 'test-component')

    logging.info('test')
    expect(console.info).toHaveBeenCalledTimes(1)
    expect(console.error).not.toHaveBeenCalled()
  })

  it('calls console.warn', () => {
    const logging = new Logging('test-service', 'test-component')

    logging.warn('test')
    expect(console.warn).toHaveBeenCalledTimes(1)
    expect(console.error).not.toHaveBeenCalled()
  })

  it('calls console.error', () => {
    const logging = new Logging('test-service', 'test-component')

    logging.error('test')
    expect(console.error).toHaveBeenCalledTimes(1)
    expect(console.info).not.toHaveBeenCalled()
  })

  it('accepts error objects', () => {
    const logging = new Logging('test-service', 'test-component')

    logging.error(new Error('test error'))
    expect(console.error).toHaveBeenCalledTimes(1)
  })

  it('accepts non-string, non-error objects when debug is called', () => {
    const logging = new Logging('test-service', 'test-component')

    logging.debug(['a', 'b', 'c'])
    expect(console.debug).toHaveBeenCalledTimes(1)
  })

  afterEach(() => {
    console.debug = consoleDebug
    console.info = consoleInfo
    console.warn = consoleWarn
    console.error = consoleError
  })
})
