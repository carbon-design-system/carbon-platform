/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import 'reflect-metadata'

import { Trace } from '../../../main/microservice/decorators/trace'
import * as Runtime from '../../../main/runtime'

const getRunModeSpy = jest.spyOn(Runtime, 'getRunMode')
const isDebugEnabledSpy = jest.spyOn(Runtime, 'isDebugEnabled')

test('it instantiates a logger', () => {
  const target = {}
  const inputFn = (arg: string) => arg + 'hello'
  const descriptor = { value: inputFn }

  // Decorate the function
  Trace()(target, 'propertyKey', descriptor)

  descriptor.value('its an arg!')

  expect(target).toHaveProperty('logging')
})

describe('when modifying the runtime', () => {
  it('honors debug mode', () => {
    getRunModeSpy.mockReturnValueOnce(Runtime.RunMode.Standard)
    isDebugEnabledSpy.mockReturnValueOnce(true)

    const target = {
      logging: undefined
    }
    const inputFn = (arg: string) => arg + 'hello'
    const descriptor = { value: inputFn }

    // Decorate the function
    Trace()(target, 'propertyKey', descriptor)

    descriptor.value('its an arg!')

    expect(target.logging).toBeDefined()
  })

  it('honors dev run mode mode', () => {
    getRunModeSpy.mockReturnValueOnce(Runtime.RunMode.Dev)
    isDebugEnabledSpy.mockReturnValueOnce(false)

    const target = {
      logging: undefined
    }
    const inputFn = (arg: string) => arg + 'hello'
    const descriptor = { value: inputFn }

    // Decorate the function
    Trace()(target, 'propertyKey', descriptor)

    descriptor.value('its an arg!')

    expect(target.logging).toBeDefined()
  })

  it('can be shut off', () => {
    getRunModeSpy.mockReturnValueOnce(Runtime.RunMode.Standard)
    isDebugEnabledSpy.mockReturnValueOnce(false)

    const target = {
      logging: undefined
    }
    const inputFn = (arg: string) => arg + 'hello'
    const descriptor = { value: inputFn }

    // Decorate the function
    Trace()(target, 'propertyKey', descriptor)

    descriptor.value('its an arg!')

    expect(target.logging).toBeUndefined()
  })
})

test('it works with a non-promise', () => {
  const target = {
    logging: {
      debug: jest.fn()
    }
  }
  const inputFn = (arg: string) => arg
  const descriptor = { value: inputFn }

  // Decorate the function
  Trace()(target, 'propertyKey', descriptor)

  // Invoke the function
  descriptor.value('its an arg!')

  expect(target.logging.debug).toHaveBeenCalledTimes(2)
})

test('it works with a promise', async () => {
  const target = {
    logging: {
      debug: jest.fn()
    }
  }
  const inputFn = (arg: string) => Promise.resolve(arg)
  const descriptor = { value: inputFn }

  // Decorate the function
  Trace()(target, 'propertyKey', descriptor)

  // Invoke the function
  await descriptor.value('its an arg!')

  expect(target.logging.debug).toHaveBeenCalledTimes(2)
})

test('it works with an exception', () => {
  const target = {
    logging: {
      debug: jest.fn()
    }
  }
  const inputFn = (arg: string) => {
    throw new Error(arg)
  }
  const descriptor = { value: inputFn }

  // Decorate the function
  Trace()(target, 'propertyKey', descriptor)

  // Invoke the function
  let result: any
  try {
    descriptor.value('its an arg!')
  } catch (err) {
    result = err
  }

  expect(result).toBeInstanceOf(Error)
  expect(target.logging.debug).toHaveBeenCalledTimes(2)
})

test('it works with a promise that throws an exception', async () => {
  const target = {
    logging: {
      debug: jest.fn()
    }
  }
  const inputFn = (arg: string) => Promise.reject(new Error(arg))
  const descriptor = { value: inputFn }

  // Decorate the function
  Trace()(target, 'propertyKey', descriptor)

  // Invoke the function
  let result: any
  try {
    await descriptor.value('its an arg!')
  } catch (err) {
    result = err
  }

  expect(result).toBeInstanceOf(Error)
  expect(target.logging.debug).toHaveBeenCalledTimes(2)
})

test('it preserves metadata', async () => {
  const target = {
    logging: {
      debug: jest.fn()
    }
  }
  const inputFn = (arg: string) => Promise.resolve(arg)
  const descriptor = { value: inputFn }
  const metadataKey = 'testing123'

  Reflect.defineMetadata(metadataKey, 'wowow', inputFn)

  // Decorate the function
  Trace()(target, 'propertyKey', descriptor)

  // Invoke the function
  await descriptor.value('its an arg!')

  expect(target.logging.debug).toHaveBeenCalledTimes(2)
  expect(Reflect.getMetadata(metadataKey, descriptor.value)).toBe('wowow')
})
