/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { QueryMessage, Queue } from '@carbon-platform/api/messaging'
import { PlatformMicroservice } from '@carbon-platform/api/microservice'

import { RmdxProcessingModule } from './rmdx-processing-module.js'

async function start() {
  const pm = new PlatformMicroservice({
    queue: Queue.Rmdx,
    module: RmdxProcessingModule
  })

  await pm.bind<QueryMessage>('rmdx')

  await pm.start()
}

start()
