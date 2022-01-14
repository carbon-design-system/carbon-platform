/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { EventMessage, Queue } from '@carbon-platform/api/messaging'

import { LoggingModule } from './logging.module'

async function start() {
  const service = new LoggingModule(Queue.Logging)

  await service.bind(EventMessage.LogLogged)

  await service.start()
}

start()
