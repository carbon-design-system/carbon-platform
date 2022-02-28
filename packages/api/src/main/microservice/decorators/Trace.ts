/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { PlatformController } from '../'

// TODO: incorporate messaging into this and make it more general purpose

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
      const _this = this as PlatformController

      _this.nestLogger.log(`-> ${String(propertyKey)}(${JSON.stringify(args)})`)

      return original.apply(this, args)
    }

    return descriptor
  }
}
export { Trace }
