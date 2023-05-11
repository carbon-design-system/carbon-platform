/*
 * Copyright IBM Corp. 2021, 2023
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

test.serial('it does not emit log messages in dev mode', (t) => {
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

  logging.debug('this is a test')
  logging.info('this is a test')
  logging.warn('this is a test')
  logging.error('this is a test')

  return new Promise((resolve) => {
    setImmediate(() => {
      t.is(hasEmitBeenCalled, false)
      resolve(undefined)
    })
  })
})

test.serial('it does not emit a debug log message in standard mode', (t) => {
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

  logging.debug('this is a test')

  return new Promise((resolve) => {
    setImmediate(() => {
      t.is(hasEmitBeenCalled, false)
      resolve(undefined)
    })
  })
})

test.serial('it emits once per message type in standard mode', (t) => {
  t.plan(1)

  const runtime = new Runtime({ runMode: RunMode.Standard })

  const messagingClient: any = {
    emit: () => {
      messagingClient.count++
    },
    count: 0
  }

  const logging = new Logging({
    component: 'MyComponent',
    runtime,
    messagingClient
  })

  logging.info('this is a test')
  logging.warn('this is a test')
  logging.error('this is a test')

  return new Promise((resolve) => {
    setImmediate(() => {
      t.is(messagingClient.count, 3)
      resolve(undefined)
    })
  })
})

test.serial('it respects the global remote logging allowed setting', (t) => {
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

  logging.info('this is a test')

  return new Promise((resolve) => {
    setImmediate(() => {
      t.is(hasEmitBeenCalled, false)
      resolve(undefined)
    })
  })
})

test.serial('error accepts error objects', (t) => {
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

  logging.error(new Error("wow it's an error"))

  return new Promise((resolve) => {
    setImmediate(() => {
      t.is(hasEmitBeenCalled, true)
      resolve(undefined)
    })
  })
})

test.serial('debug accepts non-string, non-error objects', (t) => {
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

  logging.debug(['a', 'b', 'c'])

  return new Promise((resolve) => {
    setImmediate(() => {
      t.is(hasEmitBeenCalled, true)
      resolve(undefined)
    })
  })
})
