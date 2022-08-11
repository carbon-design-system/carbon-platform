/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import test from 'ava'

import { Logging } from '../../main/logging/index.js'
import { RunMode, Runtime } from '../../main/runtime/index.js'

test.serial.beforeEach(() => {
  Logging.isRemoteLoggingAllowed = true
})

test.serial('it does not emit log messages in dev mode', async (t) => {
  let hasEmitBeenCalled = false
  const runtime = new Runtime({ runMode: RunMode.Dev })

  const messagingClient: any = {
    emit: (): Promise<void> => {
      hasEmitBeenCalled = true
      return Promise.resolve()
    }
  }

  const logging = new Logging({
    component: 'MyComponent',
    runtime,
    messagingClient
  })

  await logging.debug('this is a test')
  await logging.info('this is a test')
  await logging.warn('this is a test')
  await logging.error('this is a test')

  t.is(hasEmitBeenCalled, false)
})

test.serial('it does not emit a debug log message in standard mode', async (t) => {
  let hasEmitBeenCalled = false
  const runtime = new Runtime({ runMode: RunMode.Standard })

  const messagingClient: any = {
    emit: (): Promise<void> => {
      hasEmitBeenCalled = true
      return Promise.resolve()
    }
  }

  const logging = new Logging({
    component: 'MyComponent',
    runtime,
    messagingClient
  })

  await logging.debug('this is a test')

  t.is(hasEmitBeenCalled, false)
})

test.serial('it emits once per message type in standard mode', async (t) => {
  t.plan(3)

  const runtime = new Runtime({ runMode: RunMode.Standard })

  const messagingClient: any = {
    emit: (): Promise<void> => {
      t.pass()
      return Promise.resolve()
    }
  }

  const logging = new Logging({
    component: 'MyComponent',
    runtime,
    messagingClient
  })

  await logging.info('this is a test')
  await logging.warn('this is a test')
  await logging.error('this is a test')
})

test.serial('it respects the global remote logging allowed setting', async (t) => {
  let hasEmitBeenCalled = false
  const runtime = new Runtime({ runMode: RunMode.Dev })
  const messagingClient: any = {
    emit: (): Promise<void> => {
      hasEmitBeenCalled = true
      return Promise.resolve()
    }
  }

  Logging.isRemoteLoggingAllowed = false

  const logging = new Logging({
    component: 'MyComponent',
    runtime,
    messagingClient
  })

  await logging.info('this is a test')

  t.is(hasEmitBeenCalled, false)
})

test.serial('error accepts error objects', async (t) => {
  let hasEmitBeenCalled = false
  const runtime = new Runtime({ runMode: RunMode.Standard })

  const messagingClient: any = {
    emit: (): Promise<void> => {
      hasEmitBeenCalled = true
      return Promise.resolve()
    }
  }

  const logging = new Logging({
    component: 'MyComponent',
    runtime,
    messagingClient
  })

  await logging.error(new Error("wow it's an error"))

  t.is(hasEmitBeenCalled, true)
})

test.serial('debug accepts non-string, non-error objects', async (t) => {
  let hasEmitBeenCalled = false
  const runtime = new Runtime({ runMode: RunMode.Standard, isDebugEnabled: true })

  const messagingClient: any = {
    emit: (): Promise<void> => {
      hasEmitBeenCalled = true
      return Promise.resolve()
    }
  }

  const logging = new Logging({
    component: 'MyComponent',
    runtime,
    messagingClient
  })

  await logging.debug(['a', 'b', 'c'])

  t.is(hasEmitBeenCalled, true)
})
