/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Module } from '@nestjs/common'

import { EventController } from './event.controller'

@Module({
  controllers: [EventController]
})
class EventModule {}

export { EventModule }
