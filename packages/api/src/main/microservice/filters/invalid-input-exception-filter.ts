/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ArgumentsHost, Catch, RpcExceptionFilter } from '@nestjs/common'
import { RmqContext, RpcException } from '@nestjs/microservices'
import { Observable, throwError } from 'rxjs'

import { Logging } from '../../logging/index.js'
import { InvalidInputException } from '../exceptions/invalid-input-exception.js'

@Catch(InvalidInputException)
class InvalidInputExceptionFilter implements RpcExceptionFilter<InvalidInputException> {
  private static readonly DEFAULT_COMPONENT_NAME = 'invalid-input-exception-filter'

  private readonly logging: Logging

  constructor() {
    this.logging = new Logging({ component: InvalidInputExceptionFilter.DEFAULT_COMPONENT_NAME })
  }

  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    const rpcArgHost = host.switchToRpc()
    const ctx = rpcArgHost.getContext<RmqContext>()

    this.logging.component = ctx.getPattern() || InvalidInputExceptionFilter.DEFAULT_COMPONENT_NAME
    this.logging.warn(exception)

    // Return an Observable containing the exception text as per Nest requirements
    return throwError(() => exception)
  }
}

export { InvalidInputExceptionFilter }
