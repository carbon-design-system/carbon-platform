/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { QueryResult } from './outputs/query-result'

interface DataGraphMessage {
  query: string
}

interface DataGraphResponse {
  data: QueryResult
}

export { DataGraphMessage, DataGraphResponse }
