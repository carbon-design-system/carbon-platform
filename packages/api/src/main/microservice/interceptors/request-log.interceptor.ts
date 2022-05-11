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

import { Logging } from '../../logging'

@Injectable()
class RequestLogInterceptor implements NestInterceptor {
  private readonly logging: Logging

  constructor() {
    this.logging = new Logging('request-logger')
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const performanceId = uuidv4()
    performance.mark(performanceId)

    return next.handle().pipe(
      tap(async (result) => {
        const responseTime = performance.measure(performanceId, performanceId)?.duration?.toFixed(4)

        if (context.getType() === 'http') {
          await this.logHttp(context, result, responseTime)
        } else if (context.getType() === 'rpc') {
          await this.logRpc(context, result, responseTime)
        }

        performance.clearMarks(performanceId)
        performance.clearMeasures(performanceId)
      })
    )
  }

  private async logRpc(context: ExecutionContext, result: any, responseTime: string) {
    const rpcContext = context.switchToRpc()

    const logParts = [
      context.getClass().name + '#' + context.getHandler().name,
      'in: ' + JSON.stringify(rpcContext.getData()),
      'out: ' + typeof result,
      responseTime + 'ms'
    ]

    await this.logging.info(logParts.join(' '))
  }

  private async logHttp(context: ExecutionContext, result: any, responseTime: string) {
    const httpContext = context.switchToHttp()
    const req = httpContext.getRequest<Request>()

    const { httpVersion, method, socket, url, hostname } = req
    const { remoteAddress, remotePort } = socket
    const { statusCode } = httpContext.getResponse<Response>()

    const logParts = [
      hostname,
      '"' + method + ' ' + url + ' HTTP/' + httpVersion + '"',
      statusCode,
      responseTime + 'ms',
      '[' + remoteAddress + ']:' + remotePort,
      '"' + req.get('User-Agent') + '"',
      'out: ' + typeof result
    ]

    await this.logging.info(logParts.join(' '))
  }
}

export { RequestLogInterceptor }
