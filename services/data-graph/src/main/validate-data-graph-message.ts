/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { DataGraphMessage } from '@carbon-platform/api/data-graph'
import { UnvalidatedMessage } from '@carbon-platform/api/messaging'
import { InvalidInputException } from '@carbon-platform/api/microservice'

function validateDataGraphMessage(data: UnvalidatedMessage<DataGraphMessage>): DataGraphMessage {
  if (!data.query || typeof data.query !== 'string') {
    throw new InvalidInputException('query not specified')
  }

  if (data.variables && typeof data.variables !== 'object') {
    throw new InvalidInputException('variables must be an object')
  }

  return data as DataGraphMessage
}

export { validateDataGraphMessage }
