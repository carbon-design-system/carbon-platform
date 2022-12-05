/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { catchError, Observable, throwError } from 'rxjs'

import { Logging } from '../../logging/index.js'

interface UncaughtExceptionInterceptorConfig {
  logging?: Logging
}

@Injectable()
class UncaughtExceptionInterceptor implements NestInterceptor {
  private static readonly DEFAULT_COMPONENT_NAME = UncaughtExceptionInterceptor.name

  private readonly logging: Logging

  public constructor(config?: UncaughtExceptionInterceptorConfig) {
    this.logging =
      config?.logging ||
      new Logging({ component: UncaughtExceptionInterceptor.DEFAULT_COMPONENT_NAME })
  }

  intercept(_context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      catchError((err) => {
        this.logging.error(err)

        // Re-throw the error now that it is logged
        return throwError(() => err)
      })
    )
  }
}

export { UncaughtExceptionInterceptor }
