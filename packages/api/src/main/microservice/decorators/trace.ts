/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Logging } from '../../logging'

/**
 * Returns a decorated version of a method that automatically uses the Platform logging
 * infrastructure to log a set of debug messages before and after the decorated method's execution.
 * The debug messages contain the name of the called method, a stringified version of its arguments,
 * and a stringified version of its return value.
 *
 * **Note:** This decorator **redefines** the provided method in order to wrap it with logging
 * logic. AS such, it must be the final decorator attached to the method.
 *
 * @returns A decorated method.
 */
function Trace(): MethodDecorator {
  return function methodDecorator(
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value
    descriptor.value = function traced(...args: any[]) {
      if (!target.logging) {
        target.logging = new Logging(target.constructor.name)
      }

      target.logging.debug(`-> ${String(propertyKey)}(${JSON.stringify(args)})`)

      // Call the original method and capture the result
      const result = original.apply(this, args)

      if (result instanceof Promise) {
        result.then((value: any) =>
          target.logging.debug(`<- ${String(propertyKey)}: ${JSON.stringify(value)}`)
        )
      } else {
        target.logging.debug(`<- ${String(propertyKey)}: ${JSON.stringify(result)}`)
      }

      return result
    }

    // Preserve the original method name
    Object.defineProperty(descriptor.value, 'name', { value: original.name })
  }
}
export { Trace }
