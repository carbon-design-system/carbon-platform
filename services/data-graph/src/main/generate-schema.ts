/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { NestFactory } from '@nestjs/core'

import { SCHEMA_OUTPUT_FILE } from './constants.js'
import { DataGraphModule } from './data-graph-module.js'

/**
 * A helper function to generate the full-blown data graph schema and output it to its well-defined
 * output location.
 */
async function generateSchema() {
  const app = await NestFactory.create(
    DataGraphModule.register({ isPlaygroundEnabled: false, schemaOutputFile: SCHEMA_OUTPUT_FILE }),
    { logger: false }
  )
  await app.init()
}

generateSchema()
