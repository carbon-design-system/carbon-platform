/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Environment, RunMode, Runtime } from '@carbon-platform/api/runtime'
import { NestFactory } from '@nestjs/core'

import { DataGraphModule } from './data-graph-module.js'

/**
 * A helper function to generate the full-blown data graph schema and output it to its well-defined
 * output location.
 */
async function generateSchema() {
  const runtime = new Runtime({ environment: Environment.Test, runMode: RunMode.Dev })

  const app = await NestFactory.create(DataGraphModule.register(runtime), { logger: false })
  await app.init()
}

generateSchema()
