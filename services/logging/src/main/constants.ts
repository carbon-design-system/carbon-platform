/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { getEnvVar, Runtime } from '@carbon-platform/api/runtime'

const runtime = new Runtime()

const CARBON_LOGDNA_ENDPOINT = getEnvVar(
  'CARBON_LOGDNA_ENDPOINT',
  'https://logs.us-south.logging.cloud.ibm.com/logs/ingest',
  runtime
)

const CARBON_LOGDNA_KEY = getEnvVar('CARBON_LOGDNA_KEY', '', runtime)

export { CARBON_LOGDNA_ENDPOINT, CARBON_LOGDNA_KEY }
