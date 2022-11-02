/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { QueryMessage, Queue } from '@carbon-platform/api/messaging'
import { PlatformMicroservice } from '@carbon-platform/api/microservice'

// import { RunMode, Runtime } from '@carbon-platform/api/runtime'
import { BlogModule } from './blog-module.js'

async function start() {
  // const runtime = new Runtime()
  // const isPlaygroundEnabled = runtime.runMode === RunMode.Dev

  const pm = new PlatformMicroservice({
    queue: Queue.DataGraph,
    module: BlogModule
  })

  await pm.bind<QueryMessage>('medium_feed')

  await pm.start()
}

start()
