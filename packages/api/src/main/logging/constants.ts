/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { loadEnvVars } from '../runtime'

const {
  /**
   * The name of the service used during logging
   */
  CARBON_SERVICE_NAME
} = loadEnvVars({
  CARBON_SERVICE_NAME: 'undefined'
})

export { CARBON_SERVICE_NAME }
