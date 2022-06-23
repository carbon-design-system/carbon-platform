/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
interface DataGraphMessage {
  query: string
  variables?: {
    [key: string]: string
  }
}

interface DataGraphResponse<T = { [key: string]: any }> {
  data: T
  errors?: Readonly<Array<any>>
}

interface DevDatasetEntry {
  name: string
  variables?: {
    [key: string]: any
  }
  response: any
}

interface DevDatasetJson {
  queries: Array<DevDatasetEntry>
}

export { DataGraphMessage, DataGraphResponse, DevDatasetEntry, DevDatasetJson }
