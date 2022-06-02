/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Logging } from '@carbon-platform/api/logging'
import { EventMessage, Queue } from '@carbon-platform/api/messaging'
import { PlatformMicroservice } from '@carbon-platform/api/microservice'

import { LoggingModule } from './logging-module'

async function start() {
  // Disable remote logging entirely for the logging service
  Logging.setRemoteLoggingAllowed(false)

  const pm = new PlatformMicroservice({
    queue: Queue.Logging,
    module: LoggingModule,
    autoAck: true // Remove messages immediately from the queue without explicit ack
  })

  pm.bind<EventMessage>('log_logged')

  await pm.start()
}

start()
