/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import 'reflect-metadata'

import { v4 as uuidv4 } from 'uuid'

import { Logging } from '../../logging'
import { getRunMode, isDebugEnabled, RunMode } from '../../runtime'

/**
 * Returns a decorated version of a method that automatically uses the Platform logging
 * infrastructure to log a set of debug messages before and after the decorated method's execution.
 * The debug messages contain the name of the called method, a stringified version of its arguments,
 * and a stringified version of its return value.
 *
 * **Note:** This decorator **redefines** the provided method in order to wrap it with logging
 * logic. It redefines the metadata from the source method onto the new one, but certain reference
 * equality checks may fail if they are looking at method property descriptor values directly.
 *
 * @returns A decorated method.
 */
function Trace(): MethodDecorator {
  return function methodDecorator(
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const shouldTrace = isDebugEnabled() || getRunMode() === RunMode.Dev
    if (!shouldTrace) {
      return
    }

    const original = descriptor.value

    descriptor.value = function traced(...args: any[]) {
      if (!target.logging) {
        target.logging = new Logging(target.name || target.constructor.name)
      }

      const methodName = String(propertyKey)

      traceEnter(target.logging, methodName, args)

      const performanceId = uuidv4()
      let result: any

      try {
        performance.mark(performanceId)

        // Call the original method and capture the result
        result = original.apply(this, args)

        return result
      } catch (err) {
        result = err
        throw err
      } finally {
        const responseTime = performance.measure(performanceId, performanceId)?.duration?.toFixed(4)

        traceExit(target.logging, methodName, result, responseTime)

        performance.clearMarks(performanceId)
        performance.clearMeasures(performanceId)
      }
    }

    // Preserve the original method name
    Object.defineProperty(descriptor.value, 'name', { value: original.name })

    // Preserve the original metadata
    Reflect.getMetadataKeys(original).forEach((key) => {
      Reflect.defineMetadata(key, Reflect.getMetadata(key, original), descriptor.value)
    })
  }
}

function safeStringify(arg: any) {
  try {
    return JSON.stringify(arg)
  } catch {}

  try {
    return String(arg)
  } catch {}

  return typeof arg
}

function traceEnter(logging: Logging, methodName: string, args: any[]) {
  const stringArgs = args.map(safeStringify)

  logging.debug(`-> ${methodName}(${stringArgs})`)
}

function traceExit(logging: Logging, methodName: string, result: any, responseTime: string) {
  if (result instanceof Promise) {
    result.then(
      (value: any) =>
        logging.debug(`<- ${methodName} <- ${safeStringify(value)} ${responseTime}ms`),
      (err: any) => logging.debug(`-x- ${methodName} <- ${err} ${responseTime}ms`)
    )
  } else {
    logging.debug(
      `${result instanceof Error ? '-x-' : '<-'} ${methodName} <- ${
        result instanceof Error ? result : safeStringify(result)
      } ${responseTime}ms`
    )
  }
}

export { Trace }