/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Logging } from '../../logging'

/**
 * Returns a decorated version of a method that automatically uses the instance's NestJS logger
 * object to log an informational message containing the name of the called function, along with its
 * arguments.
 *
 * @returns A decorated method.
 */
function Trace(): MethodDecorator {
  return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    const original = descriptor.value
    descriptor.value = function (...args: any[]) {
      if (!target.constructor) {
        throw new Error(
          'No constructor found on decorator target. @Trace() can only be used on methods of a ' +
            'class'
        )
      }

      if (!target.logging) {
        target.logging = new Logging(target.constructor.name)
      }

      target.logging.debug(`-> ${String(propertyKey)}(${JSON.stringify(args)})`)

      const result = original.apply(target, args)

      target.logging.debug(`<- ${String(propertyKey)}: ${String(result)}`)

      return result
    }

    return descriptor
  }
}
export { Trace }
