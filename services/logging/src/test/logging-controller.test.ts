/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { LogLoggedMessage } from '@carbon-platform/api/logging'
import { UnvalidatedMessage } from '@carbon-platform/api/messaging'
import { Environment, RunMode, Runtime } from '@carbon-platform/api/runtime'
import test from 'ava'

import { LogDnaService } from '../main/log-dna-service.js'
import { LoggingController } from '../main/logging-controller.js'

let data: UnvalidatedMessage<LogLoggedMessage>

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
  const runtime = new Runtime({ runMode: RunMode.Dev, environment: Environment.Test })
  const logDnaService = new LogDnaService(runtime)
  const loggingController = new LoggingController(logDnaService, runtime)

  loggingController.logLogged(data)
  t.pass()
})

test.serial('logLogged handles its own exception when no component specified', (t) => {
  const runtime = new Runtime({ runMode: RunMode.Dev, environment: Environment.Test })
  const logDnaService = new LogDnaService(runtime)
  const loggingController = new LoggingController(logDnaService, runtime)

  delete data.component

  loggingController.logLogged(data)
  t.pass()
})

test.serial('logLogged handles its own exception when no environment specified', (t) => {
  const runtime = new Runtime({ runMode: RunMode.Dev, environment: Environment.Test })
  const logDnaService = new LogDnaService(runtime)
  const loggingController = new LoggingController(logDnaService, runtime)

  delete data.environment

  loggingController.logLogged(data)
  t.pass()
})

test.serial('logLogged handles its own exception when no level specified', (t) => {
  const runtime = new Runtime({ runMode: RunMode.Dev, environment: Environment.Test })
  const logDnaService = new LogDnaService(runtime)
  const loggingController = new LoggingController(logDnaService, runtime)

  delete data.level

  loggingController.logLogged(data)
  t.pass()
})

test.serial('logLogged handles its own exception when no message specified', (t) => {
  const runtime = new Runtime({ runMode: RunMode.Dev, environment: Environment.Test })
  const logDnaService = new LogDnaService(runtime)
  const loggingController = new LoggingController(logDnaService, runtime)

  delete data.message

  loggingController.logLogged(data)
  t.pass()
})

test.serial('logLogged handles its own exception when no service specified', (t) => {
  const runtime = new Runtime({ runMode: RunMode.Dev, environment: Environment.Test })
  const logDnaService = new LogDnaService(runtime)
  const loggingController = new LoggingController(logDnaService, runtime)

  delete data.service

  loggingController.logLogged(data)
  t.pass()
})

test.serial('logLogged handles its own exception when no timestamp specified', (t) => {
  const runtime = new Runtime({ runMode: RunMode.Dev, environment: Environment.Test })
  const logDnaService = new LogDnaService(runtime)
  const loggingController = new LoggingController(logDnaService, runtime)

  delete data.timestamp

  loggingController.logLogged(data)
  t.pass()
})
