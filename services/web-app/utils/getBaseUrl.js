/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { DEV, getRunMode, PRODUCTION, TEST } from '@carbon-platform/run-mode'
/**
 * Obtains and returns the current base url based on the running environment.
 * @returns {string} current base url
 */
export function getBaseUrl() {
  switch (getRunMode()) {
    case DEV:
      return 'https://localhost'
    case TEST:
    case PRODUCTION:
      return process.env.CARBON_BASE_URL
  }
}
