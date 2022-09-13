/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Trace } from '../logging/index.js'
import { MessagingClient } from '../messaging/messaging-client.js'
import { RunMode } from '../runtime/interfaces.js'
import { Runtime } from '../runtime/runtime.js'
import { DevDataset } from './dev-dataset.js'
import { UnknownDevDatasetQueryException } from './exceptions/unknown-dev-dataset-query-exception.js'
import { DataGraphMessage, DataGraphResponse, DevDatasetEntry } from './interfaces.js'

interface DataGraphConfig {
  runtime?: Runtime
}

class DataGraph {
  private readonly runtime: Runtime
  private devDataset?: DevDataset

  constructor(config?: DataGraphConfig) {
    this.runtime = config?.runtime || new Runtime()
  }

  private async queryDevData<ResponseType>(
    queryInput: DataGraphMessage
  ): Promise<DataGraphResponse<ResponseType>> {
    if (!this.devDataset) {
      this.devDataset = new DevDataset()
    }

    this.devDataset.reload()
    const result = this.devDataset.get(queryInput)

    if (!result) {
      throw new UnknownDevDatasetQueryException(queryInput)
    }

    return {
      data: result
    } as DataGraphResponse<ResponseType>
  }

  private queryStandardData<ResponseType>(
    queryInput: DataGraphMessage
  ): Promise<DataGraphResponse<ResponseType>> {
    const messagingClient = MessagingClient.getInstance({ runtime: this.runtime })

    return messagingClient.query('data_graph', queryInput) as Promise<
      DataGraphResponse<ResponseType>
    >
  }

  public addDevDataset(dataset: Array<DevDatasetEntry>) {
    if (!this.devDataset) {
      this.devDataset = new DevDataset()
    }

    this.devDataset.reload()
    this.devDataset.addDynamic(...dataset)
  }

  @Trace()
  public queryData<ResponseType>(
    queryInput: DataGraphMessage
  ): Promise<DataGraphResponse<ResponseType>> {
    switch (this.runtime.runMode) {
      case RunMode.Dev:
        return this.queryDevData(queryInput)
      case RunMode.Standard:
        return this.queryStandardData(queryInput)
    }
  }
}

export { DataGraph }
