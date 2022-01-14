/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { PlatformController } from '../common/platform.controller'

// TODO: incorporate messaging into this and make it more general purpose

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
