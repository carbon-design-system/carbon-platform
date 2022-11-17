/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { UnvalidatedMessage } from '@carbon-platform/api/messaging'
import { InvalidInputException } from '@carbon-platform/api/microservice'
import { RmdxMessage } from '@carbon-platform/api/rmdx'

/**
 * Validates an incoming rmdx message.
 *
 * @param data Incoming rmdx message data.
 * @returns The input data if it passes validation. Throws an Error otherwise.
 */
function validateRmdxMessage(data: UnvalidatedMessage<RmdxMessage>): RmdxMessage {
  if (!data.srcMdx) {
    throw new InvalidInputException('srcMdx not specified')
  }

  return data as RmdxMessage
}

export { validateRmdxMessage }
