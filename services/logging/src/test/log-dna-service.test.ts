/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Environment, RunMode, Runtime } from '@carbon-platform/api/runtime'
import test from 'ava'

import { LogDnaService } from '../main/log-dna-service.js'

test('it does not create a logger in dev mode', (t) => {
  const logDnaService = new LogDnaService(
    new Runtime({ runMode: RunMode.Dev, environment: Environment.Test })
  )

  t.is(logDnaService.logDnaLogger, undefined)

  t.notThrows(() => logDnaService.log({} as any))
})

test('it calls log on the provided logger', (t) => {
  t.plan(1)

  const logDnaLogger = {
    log: () => {
      t.pass()
    }
  } as any

  const logDnaService = new LogDnaService(
    new Runtime({ runMode: RunMode.Dev, environment: Environment.Test })
  )

  type Mutable<T> = {
    -readonly [k in keyof T]: T[k]
  }

  const unsealed = logDnaService as Mutable<LogDnaService>

  unsealed.logDnaLogger = logDnaLogger

  logDnaService.log({} as any)
})
