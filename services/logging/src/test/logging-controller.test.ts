/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Logging, LogLoggedMessage } from '@carbon-platform/api/logging'
import { UnvalidatedMessage } from '@carbon-platform/api/messaging'
import { Environment } from '@carbon-platform/api/runtime'

import { LogDnaService } from '../main/log-dna-service'
import { LoggingController } from '../main/logging-controller'

beforeAll(() => {
  Logging.setRemoteLoggingAllowed(false)
})

test('logLogged runs without crashing', () => {
  const logDnaService = new LogDnaService()
  const loggingController = new LoggingController(logDnaService)

  const data: LogLoggedMessage = {
    component: 'test',
    environment: Environment.Test,
    level: 'debug',
    message: 'test message',
    service: 'test service',
    timestamp: Date.now()
  }

  expect(() => loggingController.logLogged(data)).not.toThrow()
})

describe('message validation', () => {
  let logDnaService: LogDnaService
  let loggingController: LoggingController
  let data: LogLoggedMessage

  beforeEach(() => {
    logDnaService = new LogDnaService()
    loggingController = new LoggingController(logDnaService)
    data = {
      component: 'test',
      environment: Environment.Test,
      level: 'debug',
      message: 'test message',
      service: 'test service',
      timestamp: Date.now()
    }
  })

  it('throws an error when no component specified', () => {
    delete (data as UnvalidatedMessage).component

    expect(() => loggingController.logLogged(data)).toThrow('component not specified')
  })

  it('throws an error when no environment specified', () => {
    delete (data as UnvalidatedMessage).environment

    expect(() => loggingController.logLogged(data)).toThrow('environment not specified')
  })

  it('throws an error when no level specified', () => {
    delete (data as UnvalidatedMessage).level

    expect(() => loggingController.logLogged(data)).toThrow('level not specified')
  })

  it('throws an error when no message specified', () => {
    delete (data as UnvalidatedMessage).message

    expect(() => loggingController.logLogged(data)).toThrow('message not specified')
  })

  it('throws an error when no service specified', () => {
    delete (data as UnvalidatedMessage).service

    expect(() => loggingController.logLogged(data)).toThrow('service not specified')
  })

  it('throws an error when no timestamp specified', () => {
    delete (data as UnvalidatedMessage).timestamp

    expect(() => loggingController.logLogged(data)).toThrow('timestamp not specified')
  })
})
