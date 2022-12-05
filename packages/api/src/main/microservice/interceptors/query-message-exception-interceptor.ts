/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { RmqContext } from '@nestjs/microservices'
import { catchError, Observable, of as observableOf, throwError } from 'rxjs'

import { Logging } from '../../logging/index.js'
import { QueryMessageException } from '../exceptions/query-message-exception.js'

@Injectable()
class QueryMessageExceptionInterceptor implements NestInterceptor {
  private static readonly DEFAULT_COMPONENT_NAME = QueryMessageExceptionInterceptor.name

  private readonly logging: Logging

  constructor() {
    this.logging = new Logging({
      component: QueryMessageExceptionInterceptor.DEFAULT_COMPONENT_NAME
    })
  }

  public intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      catchError((exception) => {
        // Guard - ignore all other exception types
        if (!(exception instanceof QueryMessageException)) {
          return throwError(() => exception)
        }

        const ctx = context.switchToRpc().getContext<RmqContext>()

        this.logging.component =
          ctx.getPattern() || QueryMessageExceptionInterceptor.DEFAULT_COMPONENT_NAME
        this.logging.warn(exception)

        return observableOf({
          __error: {
            name: exception.constructor.name,
            message: exception.message
          }
        })
      })
    )
  }
}

export { QueryMessageExceptionInterceptor }
