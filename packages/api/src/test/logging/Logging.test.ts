/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Logging } from '../../main/logging'

const testMessage = {
  label: 'test-component',
  message: 'this is a test message'
}

test('debug calls winston.debug', async () => {
  const mockedWinstonLogger = {
    debug: jest.fn()
  }
  const logging = new Logging(testMessage.label, mockedWinstonLogger as any)

  await logging.debug(testMessage.message)

  expect(mockedWinstonLogger.debug).toHaveBeenCalledWith(testMessage)
})

test('info calls calls winston.info', async () => {
  const mockedWinstonLogger = {
    info: jest.fn()
  }
  const logging = new Logging(testMessage.label, mockedWinstonLogger as any)

  await logging.info(testMessage.message)

  expect(mockedWinstonLogger.info).toHaveBeenCalledWith(testMessage)
})

test('warn calls winston.warn', async () => {
  const mockedWinstonLogger = {
    warn: jest.fn()
  }
  const logging = new Logging(testMessage.label, mockedWinstonLogger as any)

  await logging.warn(testMessage.message)

  expect(mockedWinstonLogger.warn).toHaveBeenCalledWith(testMessage)
})

test('error calls winston.error', async () => {
  const mockedWinstonLogger = {
    error: jest.fn()
  }
  const logging = new Logging(testMessage.label, mockedWinstonLogger as any)

  await logging.error(testMessage.message)

  expect(mockedWinstonLogger.error).toHaveBeenCalledWith(testMessage)
})

test('instantiating Logger without a winstonLogger arg still returns a logger', async () => {
  const logging = new Logging(testMessage.label)

  expect(logging).toBeInstanceOf(Logging)
})
