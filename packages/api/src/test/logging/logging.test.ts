/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Logging, LogLoggedMessage } from '../../main/logging'
import { MessagingClient } from '../../main/messaging'
import { Environment } from '../../main/runtime'
import { __test__ as RunModeTestUtils, RunMode } from '../../main/runtime/run-mode'

let mockedEmit: any

beforeEach(() => {
  mockedEmit = jest.fn()
  MessagingClient.getInstance = jest.fn().mockReturnValue({
    emit: mockedEmit
  })
})

describe('message emission', () => {
  describe('"Dev" mode', () => {
    beforeAll(() => {
      RunModeTestUtils.mockRunMode(RunMode.Dev)
    })

    it('does not emit any messages', async () => {
      const logging = new Logging('test-component', { serviceName: 'test-service' })
      await logging.debug('this is a test')
      await logging.info('this is a test')
      await logging.warn('this is a test')
      await logging.error('this is a test')

      expect(mockedEmit).not.toHaveBeenCalled()
    })

    it('emits a message when remote logging is explicitly overridden', async () => {
      const logging = new Logging('test-component', {
        serviceName: 'test-service',
        isRemoteLoggingEnabled: true
      })
      await logging.info('test')
      expect(mockedEmit).toHaveBeenCalledTimes(1)

      await logging.warn('test')
      expect(mockedEmit).toHaveBeenCalledTimes(2)

      await logging.error('test')
      expect(mockedEmit).toHaveBeenCalledTimes(3)

      await logging.debug('test')
      expect(mockedEmit).toHaveBeenCalledTimes(4)
    })

    afterAll(() => {
      RunModeTestUtils.resetRunMode()
    })
  })

  describe('"Standard" mode', () => {
    let dateNow: any

    beforeEach(() => {
      RunModeTestUtils.mockRunMode(RunMode.Standard)

      dateNow = Date.now
      Date.now = jest.fn().mockReturnValue(1234)
    })

    it('emits one message per method call', async () => {
      const logging = new Logging('test-component', { serviceName: 'test-service' })

      await logging.info('test')
      expect(mockedEmit).toHaveBeenCalledTimes(1)

      await logging.warn('test')
      expect(mockedEmit).toHaveBeenCalledTimes(2)

      await logging.error('test')
      expect(mockedEmit).toHaveBeenCalledTimes(3)
    })

    it('does not emit any messages when remote logging is explicitly disabled', async () => {
      const logging = new Logging('test-component', {
        serviceName: 'test-service',
        isRemoteLoggingEnabled: false
      })
      await logging.debug('this is a test')
      await logging.info('this is a test')
      await logging.warn('this is a test')
      await logging.error('this is a test')

      expect(mockedEmit).not.toHaveBeenCalled()
    })

    it('does not emit a debug log', async () => {
      const logging = new Logging('test-component', { serviceName: 'test-service' })
      await logging.debug('test')
      expect(mockedEmit).not.toHaveBeenCalled()
    })

    it('calls emit with a well-formed message', async () => {
      const message: LogLoggedMessage = {
        component: 'test-component',
        environment: Environment.Test,
        level: 'info',
        message: 'test',
        service: 'test-service',
        timestamp: Date.now()
      }

      const logging = new Logging(message.component, { serviceName: message.service })
      await logging.info(message.message)
      expect(mockedEmit).toHaveBeenCalledWith('log_logged', message)
    })

    it('uses the default service name when one is not provided', async () => {
      const logging = new Logging('test-component')
      await logging.info('test message')

      expect(mockedEmit).toHaveBeenCalledWith(
        'log_logged',
        expect.objectContaining({
          service: 'undefined'
        })
      )
    })

    afterEach(() => {
      Date.now = dateNow
      RunModeTestUtils.resetRunMode()
    })
  })
})

describe('console output', () => {
  let consoleDebug: any, consoleInfo: any, consoleWarn: any, consoleError: any

  beforeEach(() => {
    RunModeTestUtils.mockRunMode(RunMode.Dev)

    consoleDebug = console.debug
    consoleInfo = console.info
    consoleWarn = console.warn
    consoleError = console.error

    console.debug = jest.fn()
    console.info = jest.fn()
    console.warn = jest.fn()
    console.error = jest.fn()
  })

  it('calls console.debug', async () => {
    const logging = new Logging('test-component', { serviceName: 'test-service' })

    await logging.debug('test')
    expect(console.debug).toHaveBeenCalledTimes(1)
    expect(console.error).not.toHaveBeenCalled()
  })

  it('calls console.info', async () => {
    const logging = new Logging('test-component', { serviceName: 'test-service' })

    await logging.info('test')
    expect(console.info).toHaveBeenCalledTimes(1)
    expect(console.error).not.toHaveBeenCalled()
  })

  it('calls console.warn', async () => {
    const logging = new Logging('test-component', { serviceName: 'test-service' })

    await logging.warn('test')
    expect(console.warn).toHaveBeenCalledTimes(1)
    expect(console.error).not.toHaveBeenCalled()
  })

  it('calls console.error', async () => {
    const logging = new Logging('test-component', { serviceName: 'test-service' })

    await logging.error('test')
    expect(console.error).toHaveBeenCalledTimes(1)
    expect(console.info).not.toHaveBeenCalled()
  })

  it('accepts error objects', async () => {
    const logging = new Logging('test-component', { serviceName: 'test-service' })
    const err = new Error('test error')
    delete err.stack

    await logging.error(err)
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining('test error'))
  })

  it('uses the stack of an error object', async () => {
    const logging = new Logging('test-component', { serviceName: 'test-service' })
    const err = new Error('test error')
    err.stack = 'test stack'

    await logging.error(err)
    expect(console.error).toHaveBeenCalledTimes(1)
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining(err.stack))
  })

  it('accepts non-string, non-error objects when debug is called', () => {
    const logging = new Logging('test-component', { serviceName: 'test-service' })

    logging.debug(['a', 'b', 'c'])
    expect(console.debug).toHaveBeenCalledTimes(1)
  })

  afterEach(() => {
    RunModeTestUtils.resetRunMode()

    console.debug = consoleDebug
    console.info = consoleInfo
    console.warn = consoleWarn
    console.error = consoleError
  })
})
