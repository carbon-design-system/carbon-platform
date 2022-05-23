/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { QueryMessage, Queue } from '@carbon-platform/api/messaging'
import { PlatformMicroservice } from '@carbon-platform/api/microservice'

import { DataGraphModule } from './data-graph-module'

async function start() {
  const pm = new PlatformMicroservice({
    queue: Queue.DataGraph,
    module: DataGraphModule
  })

  pm.bind<QueryMessage>('data_graph')

  await pm.start()
}

start()
