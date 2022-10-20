/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { StatusController } from '@carbon-platform/api/microservice'
import { Module } from '@nestjs/common'

import { MediumService } from './medium-service.js'

@Module({
  controllers: [BlogController, StatusController],
  providers: [MediumService]
})
class BlogModule {}

export { BlogModule }
