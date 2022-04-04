/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { PlatformController } from '../'

/**
 * A method decorator that calls the provided validator function against the input arguments to the
 * decorated method. If validation passes, the decorated function is called like normal. If it
 * fails, then a warning is logged and the decorated function is not called.
 *
 * @param validator The function that will perform validation against the input arguments.
 * @returns A method decorator that performs validation.
 */
function Validate(validator: Function): MethodDecorator {
  return (_target: any, _propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
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
