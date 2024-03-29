/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import path from 'path'

const SCHEMA_OUTPUT_FILE = path.join(
  process.cwd(),
  '..',
  '..',
  'packages',
  'api',
  'generated',
  'data-graph.schema.graphql'
)

export { SCHEMA_OUTPUT_FILE }
