/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ArgumentsHost, Catch, RpcExceptionFilter } from '@nestjs/common'
import { RmqContext, RpcException } from '@nestjs/microservices'
import { Observable, of as observableOf } from 'rxjs'

import { Logging } from '../../logging/index.js'
import { QueryMessageException } from '../exceptions/query-message-exception.js'

@Catch(QueryMessageException)
class QueryMessageExceptionFilter implements RpcExceptionFilter<QueryMessageException> {
  private static readonly DEFAULT_COMPONENT_NAME = QueryMessageExceptionFilter.name

  private readonly logging: Logging

  constructor() {
    this.logging = new Logging({
      component: QueryMessageExceptionFilter.DEFAULT_COMPONENT_NAME
    })
  }

  catch(exception: RpcException, host: ArgumentsHost): Observable<unknown> {
    const rpcArgHost = host.switchToRpc()
    const ctx = rpcArgHost.getContext<RmqContext>()

    this.logging.component = ctx.getPattern() || QueryMessageExceptionFilter.DEFAULT_COMPONENT_NAME
    this.logging.warn(exception)

    return observableOf({
      __error: {
        name: exception.constructor.name,
        message: exception.message
      }
    })
  }
}

export { QueryMessageExceptionFilter }
