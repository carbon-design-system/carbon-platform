/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Request, Response } from 'express'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { v4 as uuidv4 } from 'uuid'

import { Logging } from '../../logging/index.js'

const MAX_INPUT_DATA_LOG_SIZE = 500 // characters

@Injectable()
class RequestLogInterceptor implements NestInterceptor {
  public static getLogTextBuilder(
    handlerType: string
  ): ((context: ExecutionContext, result: unknown, responseTime: string) => string) | undefined {
    switch (handlerType) {
      case 'http':
        return RequestLogInterceptor.buildHttpLogText
      case 'rpc':
        return RequestLogInterceptor.buildRpcLogText
      default:
        return undefined
    }
  }

  public static buildHttpLogText(
    context: ExecutionContext,
    result: unknown,
    responseTime: string
  ): string {
    const httpContext = context.switchToHttp()
    const req = httpContext.getRequest<Request>()

    const { httpVersion, method, socket, url, hostname, headers } = req
    const { remoteAddress, remotePort } = socket
    const { statusCode } = httpContext.getResponse<Response>()

    const logParts = [
      hostname,
      '"' + method + ' ' + url + ' HTTP/' + httpVersion + '"',
      statusCode,
      responseTime + 'ms',
      '[' + remoteAddress + ']:' + remotePort,
      '"' + headers['user-agent'] + '"',
      'out: ' + typeof result
    ]

    return logParts.join(' ')
  }

  public static buildRpcLogText(
    context: ExecutionContext,
    result: unknown,
    responseTime: string
  ): string {
    const rpcContext = context.switchToRpc()
    let inDataLog = JSON.stringify(rpcContext.getData())

    if (inDataLog.length > MAX_INPUT_DATA_LOG_SIZE) {
      inDataLog = inDataLog.substring(0, MAX_INPUT_DATA_LOG_SIZE) + '... (truncated)'
    }

    const logParts = [
      context.getClass().name + '#' + context.getHandler().name,
      'in: ' + inDataLog,
      'out: ' + typeof result,
      responseTime + 'ms'
    ]

    return logParts.join(' ')
  }

  private logging: Logging

  constructor(config?: { logging: Logging }) {
    this.logging = config?.logging || new Logging({ component: 'RequestLogger' })
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const performanceId = uuidv4()
    performance.mark(performanceId)

    return next.handle().pipe(
      tap(async (result) => {
        const responseTime = performance.measure(performanceId, performanceId)?.duration?.toFixed(4)

        const logText = RequestLogInterceptor.getLogTextBuilder(context.getType())?.(
          context,
          result,
          responseTime
        )

        logText && (await this.logging.info(logText))

        performance.clearMarks(performanceId)
        performance.clearMeasures(performanceId)
      })
    )
  }
}

const __test__ = {
  MAX_INPUT_DATA_LOG_SIZE
}

export { __test__, RequestLogInterceptor }
