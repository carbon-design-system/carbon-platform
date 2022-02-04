/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { loadEnvVars } from '@carbon-platform/api/runtime'

const {
  /**
   * Cloud endpoint for log ingestion.
   */
  CARBON_LOGDNA_ENDPOINT,
  /**
   * Log ingestion key.
   */
  CARBON_LOGDNA_KEY
} = loadEnvVars({
  CARBON_LOGDNA_ENDPOINT: 'https://logs.us-south.logging.cloud.ibm.com/logs/ingest',
  CARBON_LOGDNA_KEY: ''
})

export { CARBON_LOGDNA_ENDPOINT, CARBON_LOGDNA_KEY }
