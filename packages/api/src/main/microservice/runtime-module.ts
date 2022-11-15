/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { DynamicModule, Module } from '@nestjs/common'

import { Runtime } from '../runtime/runtime.js'

/**
 * A module that is provided by default to all Platform Microservices. It "provides" an instance of
 * a runtime object for use in other services, controllers, and modules.
 */
@Module({
  providers: [Runtime],
  exports: [Runtime]
})
class RuntimeModule {
  public static register(runtime: Runtime): DynamicModule {
    return {
      module: RuntimeModule,
      providers: [
        {
          provide: Runtime,
          useValue: runtime
        }
      ],
      global: true
    }
  }
}

export { RuntimeModule }
