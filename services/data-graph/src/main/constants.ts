/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const SCHEMA_OUTPUT_FILE = path.join(
  __dirname,
  '..',
  '..',
  '..',
  '..',
  'packages',
  'api',
  'generated',
  'data-graph.schema.graphql'
)

export { SCHEMA_OUTPUT_FILE }
