/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Logging } from '@carbon-platform/api/logging'
import { Plugin } from '@nestjs/apollo'
import {
  ApolloServerPlugin,
  BaseContext,
  GraphQLRequestContextWillSendResponse,
  GraphQLRequestListener
} from 'apollo-server-plugin-base'

const MAX_INPUT_DATA_LOG_SIZE = 500 // characters

/**
 * Performs basic logging of incoming data-graph graphql queries.
 */
@Plugin()
class RequestLogPlugin implements ApolloServerPlugin {
  private readonly logging: Logging

  constructor() {
    this.logging = new Logging({ component: 'DataGraphRequestLogger' })
  }

  private async log(requestContext: GraphQLRequestContextWillSendResponse<BaseContext>) {
    let query =
      requestContext.request.query?.replace(/\s+/g, ' ').trim() || 'unable to find incoming query'

    if (query.length > MAX_INPUT_DATA_LOG_SIZE) {
      query = query.substring(0, MAX_INPUT_DATA_LOG_SIZE) + '... (truncated)'
    }

    await this.logging.info(query)
  }

  async requestDidStart(): Promise<GraphQLRequestListener<BaseContext>> {
    return {
      willSendResponse: async (requestContext) => {
        this.log(requestContext)
      }
    }
  }
}

export { RequestLogPlugin }
