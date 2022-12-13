/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { v4 as uuidv4 } from 'uuid'

import { Logging, safeStringify } from '../../logging/index.js'

const MAX_LOG_PART_SIZE = 500 // characters

@Injectable()
class RpcRequestLogInterceptor implements NestInterceptor {
  public static buildRpcLogText(
    context: ExecutionContext,
    result: string,
    responseTime: string
  ): string {
    const rpcContext = context.switchToRpc()
    let inLog = safeStringify(rpcContext.getData())

    if (inLog.length > MAX_LOG_PART_SIZE) {
      inLog = inLog.substring(0, MAX_LOG_PART_SIZE) + '... (truncated)'
    }

    if (result.length > MAX_LOG_PART_SIZE) {
      result = result.substring(0, MAX_LOG_PART_SIZE) + '... (truncated)'
    }

    const logParts = [
      context.getClass().name + '#' + context.getHandler().name,
      'in: ' + inLog,
      'out: ' + result,
      responseTime + 'ms'
    ]

    return logParts.join(' ')
  }

  private logging: Logging

  public constructor(config?: { logging: Logging }) {
    this.logging = config?.logging || new Logging({ component: 'RequestLogger' })
  }

  public intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    // Guard - only log rpc requests
    if (context.getType() !== 'rpc') {
      return next.handle()
    }

    const performanceId = uuidv4()
    performance.mark(performanceId)

    return next.handle().pipe(
      catchError((err) => {
        this.measureAndLog(context, 'Error', performanceId)

        // Re-throw the error now that it is logged
        return throwError(() => err)
      }),
      tap(async (result) => {
        this.measureAndLog(context, safeStringify(result).length + ' Bytes', performanceId)
      })
    )
  }

  private async measureAndLog(context: ExecutionContext, result: string, performanceId: string) {
    const responseTime = performance.measure(performanceId, performanceId)?.duration?.toFixed(2)

    const logText = RpcRequestLogInterceptor.buildRpcLogText(context, result, responseTime)

    logText && (await this.logging.info(logText))

    performance.clearMarks(performanceId)
    performance.clearMeasures(performanceId)
  }
}

const __test__ = {
  MAX_LOG_PART_SIZE
}

export { __test__, RpcRequestLogInterceptor }
