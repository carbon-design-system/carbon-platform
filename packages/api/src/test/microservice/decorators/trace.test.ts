/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import 'reflect-metadata'

import test from 'ava'

import { Logging } from '../../../main/logging/logging.js'
import { Trace } from '../../../main/microservice/decorators/trace.js'
import { RunMode, Runtime } from '../../../main/runtime/index.js'

const inputFn = (arg: string) => arg + 'hello'
const descriptor = { value: inputFn }

test('it instantiates a logger', (t) => {
  const runtime = new Runtime({ runMode: RunMode.Dev, isDebugEnabled: true })
  const target: { logging?: Logging } = {}

  // Decorate the function
  Trace({ runtime })(target, 'propertyKey', descriptor)

  descriptor.value('its an arg!')

  t.true(target.logging instanceof Logging)
})

test('it returns the original value', (t) => {
  const runtime = new Runtime({ runMode: RunMode.Dev, isDebugEnabled: true })
  const target: { logging?: Logging } = {}

  // Decorate the function
  Trace({ runtime })(target, 'propertyKey', descriptor)

  const input = 'its an arg!'
  const result = descriptor.value(input)

  t.is(result, input + 'hello')
})

test('it honors debug mode in standard run mode', (t) => {
  const runtime = new Runtime({ runMode: RunMode.Standard, isDebugEnabled: true })
  const target: { logging?: Logging } = {}

  // Decorate the function
  Trace({ runtime })(target, 'propertyKey', descriptor)

  descriptor.value('its an arg!')

  t.true(target.logging instanceof Logging)
})

test('it debugs in dev run mode even when debug mode is off', (t) => {
  const runtime = new Runtime({ runMode: RunMode.Dev, isDebugEnabled: false })
  const target: { logging?: Logging } = {}

  // Decorate the function
  Trace({ runtime })(target, 'propertyKey', descriptor)

  descriptor.value('its an arg!')

  t.true(target.logging instanceof Logging)
})

test('it can be shut off', (t) => {
  const runtime = new Runtime({ runMode: RunMode.Standard, isDebugEnabled: false })
  const target: { logging?: Logging } = {}

  // Decorate the function
  Trace({ runtime })(target, 'propertyKey', descriptor)

  descriptor.value('its an arg!')

  t.is(target.logging, undefined)
})

test('it works with a promise', async (t) => {
  t.plan(2)

  const runtime = new Runtime({ runMode: RunMode.Dev })
  const target: { logging?: Logging } = {}
  const logging = {
    debug: () => {
      t.pass()
    }
  }
  const inputFn = (arg: string) => Promise.resolve(arg)
  const descriptor = { value: inputFn }

  // Decorate the function
  Trace({ runtime, logging: logging as any })(target, 'propertyKey', descriptor)

  await descriptor.value('its an arg!')
})

test('it works with an exception', (t) => {
  t.plan(3)

  const runtime = new Runtime({ runMode: RunMode.Dev })
  const target: { logging?: Logging } = {}
  const logging = {
    debug: () => {
      t.pass()
    }
  }

  const inputFn = (arg: string) => {
    throw new Error(arg)
  }
  const descriptor = { value: inputFn }

  // Decorate the function
  Trace({ runtime, logging: logging as any })(target, 'propertyKey', descriptor)

  // Invoke the function
  let result: any
  try {
    descriptor.value('its an arg!')
  } catch (err) {
    result = err
  }

  t.true(result instanceof Error)
})

test('it works with a promise that thrown an exception', async (t) => {
  t.plan(3)

  const runtime = new Runtime({ runMode: RunMode.Dev })
  const target: { logging?: Logging } = {}
  const logging = {
    debug: () => {
      t.pass()
    }
  }

  const inputFn = (arg: string) => Promise.reject(new Error(arg))
  const descriptor = { value: inputFn }

  // Decorate the function
  Trace({ runtime, logging: logging as any })(target, 'propertyKey', descriptor)

  // Invoke the function
  let result: any
  try {
    await descriptor.value('its an arg!')
  } catch (err) {
    result = err
  }

  t.true(result instanceof Error)
})

test('it preserves metadata', (t) => {
  const target: { logging?: Logging } = {}
  const metadataInputFn = (arg: string) => arg
  const descriptor = { value: metadataInputFn }
  const metadataKey = 'testing123'

  Reflect.defineMetadata(metadataKey, 'wowow', metadataInputFn)

  // Decorate the function
  Trace()(target, 'propertyKey', descriptor)

  // Invoke the function
  descriptor.value('its an arg!')

  t.is(Reflect.getMetadata(metadataKey, descriptor.value), 'wowow')
})
