/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { DataGraphMessage } from '../interfaces.js'

class UnknownDevDatasetQueryException extends Error {
  constructor(queryInput: DataGraphMessage) {
    super(
      `No dev dataset response found for query: ${queryInput.query} and variables: ${JSON.stringify(
        queryInput.variables
      )}`
    )
  }
}

export { UnknownDevDatasetQueryException }
