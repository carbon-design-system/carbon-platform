/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { getRunMode, RunMode } from '@carbon-platform/api/run-mode'

// ingestion endpoint: 'https://logs.us-south.logging.cloud.ibm.com/logs/ingest'

// TODO: these should come from a centralized envvar retrieval and validation source
const CARBON_LOGDNA_KEY = process.env.CARBON_LOGDNA_KEY || ''
const CARBON_LOGDNA_ENDPOINT = process.env.CARBON_LOGDNA_ENDPOINT || ''

if (getRunMode() === RunMode.Prod && !process.env.CARBON_LOGDNA_ENDPOINT) {
  throw new Error('CARBON_LOGDNA_ENDPOINT must be set in PROD run mode')
}

if (getRunMode() === RunMode.Prod && !process.env.CARBON_LOGDNA_KEY) {
  throw new Error('CARBON_LOGDNA_KEY must be set in PROD run mode')
}

export { CARBON_LOGDNA_ENDPOINT, CARBON_LOGDNA_KEY }
