/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import 'reflect-metadata'

import test from 'ava'

import { __test__, Trace } from '../../../main/logging/decorators/trace.js'
import { Logging } from '../../../main/logging/logging.js'
import { safeStringify } from '../../../main/logging/safe-stringify.js'
import { RunMode, Runtime } from '../../../main/runtime/index.js'

const inputFn = (arg: string) => arg + 'hello'
const descriptor = { value: inputFn }

test('it instantiates a logger', (t) => {
  const runtime = new Runtime({ runMode: RunMode.Dev, isDebugEnabled: true })
  const target = new (class MyTarget {
    logging?: Logging
  })()

  // Decorate the function
  Trace({ runtime })(target, 'not used', descriptor)

  descriptor.value('its an arg!')

  t.true(target.logging instanceof Logging)
})

test('it returns the original value', (t) => {
  const runtime = new Runtime({ runMode: RunMode.Dev, isDebugEnabled: true })
  const target = new (class MyTarget {
    logging?: Logging
  })()

  // Decorate the function
  Trace({ runtime })(target, 'not used', descriptor)

  const input = 'its an arg!'
  const result = descriptor.value(input)

  t.is(result, input + 'hello')
})

test('it honors debug mode in standard run mode', (t) => {
  const runtime = new Runtime({ runMode: RunMode.Standard, isDebugEnabled: true })
  const target = new (class MyTarget {
    logging?: Logging
  })()

  // Decorate the function
  Trace({ runtime })(target, 'not used', descriptor)

  descriptor.value('its an arg!')

  t.true(target.logging instanceof Logging)
})

test('it debugs in dev run mode by default', (t) => {
  const runtime = new Runtime({ runMode: RunMode.Dev })
  const target = new (class MyTarget {
    logging?: Logging
  })()

  // Decorate the function
  Trace({ runtime })(target, 'not used', descriptor)

  descriptor.value('its an arg!')

  t.true(target.logging instanceof Logging)
})

test('it turns off debug in dev run mode when explicity set  to false', (t) => {
  const runtime = new Runtime({ runMode: RunMode.Dev, isDebugEnabled: false })
  const target = new (class MyTarget {
    logging?: Logging
  })()

  // Decorate the function
  Trace({ runtime })(target, 'not used', descriptor)

  descriptor.value('its an arg!')

  t.is(target.logging, undefined)
})

test('it can be shut off', (t) => {
  const runtime = new Runtime({ runMode: RunMode.Standard, isDebugEnabled: false })
  const target = new (class MyTarget {
    logging?: Logging
  })()

  // Decorate the function
  Trace({ runtime })(target, 'not used', descriptor)

  descriptor.value('its an arg!')

  t.is(target.logging, undefined)
})

test('it works with a promise', async (t) => {
  t.plan(2)

  const runtime = new Runtime({ runMode: RunMode.Dev })
  const target = new (class MyTarget {
    logging?: Logging
  })()
  const logging = new (class MyLogging {
    debug() {
      t.pass()
    }
  })()

  const myInputFn = (arg: string) => Promise.resolve(arg)
  const myDescriptor = { value: myInputFn }

  // Decorate the function
  Trace({ runtime, logging: logging as any })(target, 'not used', myDescriptor)

  await myDescriptor.value('its an arg!')
})

test('it works with an exception', (t) => {
  t.plan(3)

  const runtime = new Runtime({ runMode: RunMode.Dev })
  const target = new (class MyTarget {
    logging?: Logging
  })()
  const logging = new (class MyLogging {
    debug() {
      t.pass()
    }
  })()

  const myInputFn = (arg: string) => {
    throw new Error(arg)
  }
  const myDescriptor = { value: myInputFn }

  // Decorate the function
  Trace({ runtime, logging: logging as any })(target, 'not used', myDescriptor)

  // Invoke the function
  let result: any
  try {
    myDescriptor.value('its an arg!')
  } catch (err) {
    result = err
  }

  t.true(result instanceof Error)
})

test('it works with a promise that throws an exception', async (t) => {
  t.plan(3)

  const runtime = new Runtime({ runMode: RunMode.Dev })
  const target = new (class MyTarget {
    logging?: Logging
  })()
  const logging = new (class MyLogging {
    debug() {
      t.pass()
    }
  })()

  const myInputFn = (arg: string) => Promise.reject(new Error(arg))
  const myDescriptor = { value: myInputFn }

  // Decorate the function
  Trace({ runtime, logging: logging as any })(target, 'not used', myDescriptor)

  // Invoke the function
  let result: any
  try {
    await myDescriptor.value('its an arg!')
  } catch (err) {
    result = err
  }

  t.true(result instanceof Error)
})

test('it works with an undefined return value', (t) => {
  t.plan(2)

  const runtime = new Runtime({ runMode: RunMode.Dev })
  const target = new (class MyTarget {
    logging?: Logging
  })()
  const logging = new (class MyLogging {
    debug(input: string) {
      if (input.startsWith('<-')) {
        t.true(input.startsWith('<- myInputFn <- undefined'))
      } else {
        t.true(input.startsWith('->'))
      }
    }
  })()

  const myInputFn = () => undefined
  const myDescriptor = { value: myInputFn }

  // Decorate the function
  Trace({ runtime, logging: logging as any })(target, 'not used', myDescriptor)

  // Invoke the function
  myDescriptor.value()
})

test('it works with a symbol', (t) => {
  t.plan(2)

  const runtime = new Runtime({ runMode: RunMode.Dev })
  const target = new (class MyTarget {
    logging?: Logging
  })()
  const logging = new (class MyLogging {
    debug(input: string) {
      if (input.startsWith('<-')) {
        t.true(input.startsWith('<- myInputFn <- Symbol(asdf)'))
      } else {
        t.true(input.startsWith('->'))
      }
    }
  })()

  const myInputFn = () => Symbol('asdf')
  const myDescriptor = { value: myInputFn }

  // Decorate the function
  Trace({ runtime, logging: logging as any })(target, 'not used', myDescriptor)

  // Invoke the function
  myDescriptor.value()
})

test('it works with a bigint', (t) => {
  t.plan(2)

  const runtime = new Runtime({ runMode: RunMode.Dev })
  const target = new (class MyTarget {
    logging?: Logging
  })()
  const logging = new (class MyLogging {
    debug(input: string) {
      if (input.startsWith('<-')) {
        t.true(input.startsWith('<- myInputFn <- 123'))
      } else {
        t.true(input.startsWith('->'))
      }
    }
  })()

  const myInputFn = () => BigInt(123)
  const myDescriptor = { value: myInputFn }

  // Decorate the function
  Trace({ runtime, logging: logging as any })(target, 'not used', myDescriptor)

  // Invoke the function
  myDescriptor.value()
})

test('it preserves metadata', (t) => {
  const target = new (class MyTarget {
    logging?: Logging
  })()
  const metadataInputFn = (arg: string) => arg
  const myDescriptor = { value: metadataInputFn }
  const metadataKey = 'testing123'

  Reflect.defineMetadata(metadataKey, 'wowow', metadataInputFn)

  // Decorate the function
  Trace()(target, 'not used', myDescriptor)

  // Invoke the function
  myDescriptor.value('its an arg!')

  t.is(Reflect.getMetadata(metadataKey, myDescriptor.value), 'wowow')
})

test('it truncates a long arg list', (t) => {
  t.plan(2)

  const argsList: Array<string> = []
  for (let i = 0; i < 500; i++) {
    argsList.push('a')
  }
  const expected =
    '-> myMethodName(' +
    String(argsList.map(safeStringify)).substring(0, __test__.MAX_ARGS_STRING_LENGTH) +
    '... (truncated))'

  const runtime = new Runtime({ runMode: RunMode.Dev })
  const target = new (class MyTarget {
    logging?: Logging
  })()
  const logging = new (class MyLogging {
    debug(input: string) {
      if (input.startsWith('->')) {
        t.is(input, expected)
      } else {
        t.true(input.startsWith('<-'))
      }
    }
  })()

  const myInputFn = function myMethodName(...arg: string[]) {
    return arg + 'hello'
  }
  const myDescriptor = { value: myInputFn }

  // Decorate the function
  Trace({ runtime, logging: logging as any })(target, 'not used', myDescriptor)

  myDescriptor.value(...argsList)
})

test('it truncates a long return value', (t) => {
  t.plan(2)

  const retVal = ''.padEnd(__test__.MAX_ARGS_STRING_LENGTH * 2, 'a')

  const expected =
    '<- myMethodName <- ' +
    JSON.stringify(retVal).substring(0, __test__.MAX_ARGS_STRING_LENGTH) +
    '... (truncated)'

  const runtime = new Runtime({ runMode: RunMode.Dev })
  const target = new (class MyTarget {
    logging?: Logging
  })()
  const logging = new (class MyLogging {
    debug(input: string) {
      if (input.startsWith('<-')) {
        t.true(input.startsWith(expected))
      } else {
        t.true(input.startsWith('->'))
      }
    }
  })()

  const myInputFn = function myMethodName() {
    return retVal
  }
  const myDescriptor = { value: myInputFn }

  // Decorate the function
  Trace({ runtime, logging: logging as any })(target, 'not used', myDescriptor)

  myDescriptor.value()
})
