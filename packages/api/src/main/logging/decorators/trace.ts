/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import 'reflect-metadata'

import { v4 as uuidv4 } from 'uuid'

import { RunMode, Runtime } from '../../runtime/index.js'
import { Logging } from '../index.js'

const MAX_ARGS_STRING_LENGTH = 500 // characters

/**
 * Returns a decorated version of a method that automatically uses the Platform logging
 * infrastructure to log a set of debug messages before and after the decorated method's execution.
 * The debug messages contain the name of the called method, a stringified version of its arguments,
 * and a stringified version of its return value.
 *
 * **Note:** This decorator **redefines** the provided method in order to wrap it with logging
 * logic. It reconstitutes the metadata from the source method onto the new one, but certain
 * reference equality checks may fail if they are looking at method property descriptor values
 * directly.
 *
 * @returns A decorated method.
 */
function Trace(config?: { runtime?: Runtime; logging?: Logging }): MethodDecorator {
  return function methodDecorator(target, _propertyKey, descriptor) {
    const runtime = config?.runtime || new Runtime()
    const shouldTrace = runtime.isDebugEnabled ?? runtime.runMode === RunMode.Dev
    if (!shouldTrace) {
      return
    }

    if (!descriptor.value) {
      return
    }

    const traceableTarget = target as typeof target & { logging?: Logging; name?: string }

    if (!traceableTarget.logging) {
      traceableTarget.logging =
        config?.logging ||
        new Logging({ component: traceableTarget.name || target.constructor.name })
    }

    const original = descriptor.value as (...args: unknown[]) => unknown

    descriptor.value = withTrace(traceableTarget.logging, original) as typeof descriptor.value

    // Preserve the original method name
    Object.defineProperty(descriptor.value, 'name', { value: original.name })

    // Preserve the original metadata
    Reflect.getMetadataKeys(original).forEach((key) => {
      Reflect.defineMetadata(key, Reflect.getMetadata(key, original), descriptor.value!)
    })
  }
}

/**
 * Returns a wrapped version of a function that uses the provided logger to log a set of debug
 * messages before and after the wrapped functions's execution. The debug messages contain the name
 * of the called function, a stringified version of its arguments, and a stringified version of its
 * return value.
 *
 * @returns A wrapped function.
 */
function withTrace<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- need to accept any function args
  T extends (...args: any[]) => unknown
>(logging: Logging, functionDef: T): T {
  const functionName = functionDef.name || '(anonymous function)'

  return function traced(this: unknown, ...args: unknown[]) {
    traceEnter(logging, functionName, args)

    const performanceId = uuidv4()
    let result

    try {
      performance.mark(performanceId)

      // Call the original method and capture the result
      result = functionDef.apply(this, args)

      return result
    } catch (err) {
      result = err
      throw err
    } finally {
      const responseTime = performance.measure(performanceId, performanceId)?.duration?.toFixed(4)

      traceExit(logging, functionName, result, responseTime)

      performance.clearMarks(performanceId)
      performance.clearMeasures(performanceId)
    }
  } as T
}

function safeStringify(arg: unknown): string {
  let result

  try {
    result = JSON.stringify(arg)
  } catch {}

  if (!result) {
    result = String(arg)
  }

  return result
}

function truncate(str: string) {
  if (str.length > MAX_ARGS_STRING_LENGTH) {
    return str.substring(0, MAX_ARGS_STRING_LENGTH) + '... (truncated)'
  }

  return str
}

async function traceEnter(logging: Logging, methodName: string, args: unknown[]) {
  const stringArgs = truncate(String(args.map(safeStringify)))

  await logging.debug(`-> ${methodName}(${stringArgs})`)
}

async function traceExit(
  logging: Logging,
  methodName: string,
  result: unknown,
  responseTime: string
) {
  if (result instanceof Promise) {
    result.then(
      async (value: unknown) =>
        logging.debug(`<- ${methodName} <- ${truncate(safeStringify(value))} ${responseTime}ms`),
      (err: unknown) => logging.debug(`-x- ${methodName} <- ${err} ${responseTime}ms`)
    )
  } else {
    await logging.debug(
      `${result instanceof Error ? '-x-' : '<-'} ${methodName} <- ${
        result instanceof Error ? result : truncate(safeStringify(result))
      } ${responseTime}ms`
    )
  }
}

const __test__ = {
  safeStringify,
  MAX_ARGS_STRING_LENGTH
}

export { __test__, Trace, withTrace }
