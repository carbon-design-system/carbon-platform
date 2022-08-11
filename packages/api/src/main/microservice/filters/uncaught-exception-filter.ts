/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Catch, HttpServer } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { Observable, throwError } from 'rxjs'

import { Logging } from '../../logging/index.js'

interface UncaughtExceptionFilterConfig {
  applicationRef?: HttpServer<any, any>
  logging?: Logging
}

@Catch()
class UncaughtExceptionFilter extends BaseExceptionFilter {
  private static readonly DEFAULT_COMPONENT_NAME = 'uncaught-exception-filter'

  private logging?: Logging

  constructor(config?: UncaughtExceptionFilterConfig) {
    super(config?.applicationRef)

    if (config?.logging) {
      this.logging = config.logging
    }
  }

  override catch(exception: unknown): Observable<any> {
    if (!this.logging) {
      this.logging = new Logging({ component: UncaughtExceptionFilter.DEFAULT_COMPONENT_NAME })
    }

    this.logging.error(exception as Error)

    // Return an Observable containing the exception text as per Nest requirements
    return throwError(() => exception)
  }
}

export { UncaughtExceptionFilter }
