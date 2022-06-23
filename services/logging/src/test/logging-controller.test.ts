/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { LogLoggedMessage } from '@carbon-platform/api/logging'
import { UnvalidatedMessage } from '@carbon-platform/api/messaging'
import { Environment } from '@carbon-platform/api/runtime'
import test from 'ava'

import { LogDnaService } from '../main/log-dna-service.js'
import { LoggingController } from '../main/logging-controller.js'

let data: LogLoggedMessage

test.beforeEach(() => {
  data = {
    component: 'test',
    environment: Environment.Test,
    level: 'debug',
    message: 'test message',
    service: 'test service',
    timestamp: Date.now()
  }
})

test.serial('logLogged runs without crashing', (t) => {
  const logDnaService = new LogDnaService({})
  const loggingController = new LoggingController(logDnaService)

  loggingController.logLogged(data)
  t.pass()
})

test.serial('logLogged handles its own exception when no component specified', (t) => {
  const logDnaService = new LogDnaService({})
  const loggingController = new LoggingController(logDnaService)

  delete (data as UnvalidatedMessage).component

  loggingController.logLogged(data)
  t.pass()
})

test.serial('logLogged handles its own exception when no environment specified', (t) => {
  const logDnaService = new LogDnaService({})
  const loggingController = new LoggingController(logDnaService)

  delete (data as UnvalidatedMessage).environment

  loggingController.logLogged(data)
  t.pass()
})

test.serial('logLogged handles its own exception when no level specified', (t) => {
  const logDnaService = new LogDnaService({})
  const loggingController = new LoggingController(logDnaService)

  delete (data as UnvalidatedMessage).level

  loggingController.logLogged(data)
  t.pass()
})

test.serial('logLogged handles its own exception when no message specified', (t) => {
  const logDnaService = new LogDnaService({})
  const loggingController = new LoggingController(logDnaService)

  delete (data as UnvalidatedMessage).message

  loggingController.logLogged(data)
  t.pass()
})

test.serial('logLogged handles its own exception when no service specified', (t) => {
  const logDnaService = new LogDnaService({})
  const loggingController = new LoggingController(logDnaService)

  delete (data as UnvalidatedMessage).service

  loggingController.logLogged(data)
  t.pass()
})

test.serial('logLogged handles its own exception when no timestamp specified', (t) => {
  const logDnaService = new LogDnaService({})
  const loggingController = new LoggingController(logDnaService)

  delete (data as UnvalidatedMessage).timestamp

  loggingController.logLogged(data)
  t.pass()
})
