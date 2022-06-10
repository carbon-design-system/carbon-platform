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
  GraphQLRequestContext,
  GraphQLRequestListener
} from 'apollo-server-plugin-base'
import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'

@Plugin()
class RequestLogPlugin implements ApolloServerPlugin {
  private readonly logging: Logging

  constructor() {
    this.logging = new Logging({ component: 'request-logger' })
  }

  private async log(requestContext: GraphQLRequestContext, performanceId: string) {
    const responseTime = performance.measure(performanceId, performanceId)?.duration?.toFixed(4)

    const req = requestContext.context.req as Request
    const res = req.res as Response

    const { method, url, hostname, httpVersion, socket } = req
    const { remoteAddress, remotePort } = socket
    const { statusCode } = res

    const logParts = [
      hostname,
      '"' + method + ' ' + url + ' HTTP/' + httpVersion + '"',
      statusCode,
      responseTime + 'ms',
      '[' + remoteAddress + ']:' + remotePort,
      '"' + req.get('User-Agent') + '"',
      'in: ' + requestContext.request.query?.replace(/\s+/g, ' ').trim(),
      'out: ' + typeof requestContext.response?.data
    ]

    await this.logging.info(logParts.join(' '))

    this.cleanupPerformance(performanceId)
  }

  private cleanupPerformance(performanceId: string) {
    performance.clearMarks(performanceId)
    performance.clearMeasures(performanceId)
  }

  async requestDidStart(): Promise<GraphQLRequestListener> {
    const performanceId = uuidv4()
    performance.mark(performanceId)

    return {
      willSendResponse: async (requestContext) => {
        this.log(requestContext, performanceId)
      }
    }
  }
}

export { RequestLogPlugin }
