/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { PlatformController } from '../common/platform.controller'

function Validate(validator: Function): MethodDecorator {
  return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    const original = descriptor.value
    descriptor.value = function (...args: any[]) {
      const _this = this as PlatformController
      try {
        validator(...args)
        return original.apply(_this, args)
      } catch (e) {
        _this.nestLogger.warn(e)
      }
    }
    return descriptor
  }
}

export { Validate }
