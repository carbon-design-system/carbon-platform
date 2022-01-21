/*
 * Copyright IBM Corp. 2022, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { LogLoggedMessage } from '@carbon-platform/api/logging'

/**
 * Validates an incoming log message to ensure all required fields have been specified.
 *
 * @param data Incoming log message data.
 */
function logMessageValidator(data: LogLoggedMessage) {
  if (!data.component) {
    throw new Error('component not specified')
  }
  if (!data.environment) {
    throw new Error('environment not specified')
  }
  if (!data.level) {
    throw new Error('level not specified')
  }
  if (!data.message) {
    throw new Error('message not specified')
  }
  if (!data.service) {
    throw new Error('service not specified')
  }
  if (!data.timestamp) {
    throw new Error('timestamp not specified')
  }
}

export { logMessageValidator }
