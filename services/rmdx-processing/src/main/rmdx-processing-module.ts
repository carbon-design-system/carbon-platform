/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { StatusController } from '@carbon-platform/api/microservice'
import { Module } from '@nestjs/common'

import { RmdxProcessingController } from './rmdx-processing-controller.js'
import { RmdxService } from './rmdx-service.js'

@Module({
  controllers: [RmdxProcessingController, StatusController],
  providers: [
    RmdxService,
    {
      provide: 'ALLOWED_COMPONENTS',
      useValue: []
    }
  ]
})
class RmdxProcessingModule {}

export { RmdxProcessingModule }
