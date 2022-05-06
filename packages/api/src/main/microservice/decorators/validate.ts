/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Logging } from '../../logging'

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
      const _this = this as {
        logging?: Logging
        constructor?: {
          name: string
        }
      }

      if (!_this.constructor) {
        throw new Error(
          'No constructor found on `this`. @Validate() can only be used on methods of a class'
        )
      }

      if (!_this.logging) {
        _this.logging = new Logging(_this.constructor.name)
      }

      try {
        validator(...args)
        return original.apply(_this, args)
      } catch (e) {
        if (_this.logging) {
          _this.logging.warn(e as Error)
        }
      }
    }
    return descriptor
  }
}

export { Validate }
