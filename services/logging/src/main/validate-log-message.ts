/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { LogLoggedMessage } from '@carbon-platform/api/logging'
import { UnvalidatedMessage } from '@carbon-platform/api/messaging'
import { InvalidInputException } from '@carbon-platform/api/microservice'

/**
 * Validates an incoming log message to ensure all required fields have been specified.
 *
 * @param data Incoming log message data.
 * @returns true if the mesage is a valid LogLoggedMessage. Throws an Error otherwise.
 */
function validateLogMessage(data: UnvalidatedMessage): LogLoggedMessage {
  if (!data.component) {
    throw new InvalidInputException('component not specified')
  }
  if (!data.environment) {
    throw new InvalidInputException('environment not specified')
  }
  if (!data.level) {
    throw new InvalidInputException('level not specified')
  }
  if (!data.message) {
    throw new InvalidInputException('message not specified')
  }
  if (!data.service) {
    throw new InvalidInputException('service not specified')
  }
  if (!data.timestamp) {
    throw new InvalidInputException('timestamp not specified')
  }

  return data as LogLoggedMessage
}

export { validateLogMessage }
