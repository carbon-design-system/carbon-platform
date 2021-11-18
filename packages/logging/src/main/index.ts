/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { DEV, getRunMode, PRODUCTION } from '@carbon-platform/run-mode'

async function debug(message: string) {
  // Debug logging is disabled in production mode
  if (getRunMode() === PRODUCTION) {
    return
  }

  console.debug(message)

  if (getRunMode() === DEV) {
    return
  }

  // TODO send message to messaging service
  console.debug('FIX ME')
}

async function info(message: string) {
  console.info(message)

  if (getRunMode() === DEV) {
    return
  }

  // TODO: send message to messaging service
  console.debug('FIX ME')
}

async function warn(message: string) {
  console.warn(message)

  if (getRunMode() === DEV) {
    return
  }

  // TODO: send message to messaging service
  console.debug('FIX ME')
}

async function error(message: string, exception?: object) {
  console.error(message, exception)

  if (getRunMode() === DEV) {
    return
  }

  // TODO: send message to messaging service
  console.debug('FIX ME')
}

export { debug, error, info, warn }
