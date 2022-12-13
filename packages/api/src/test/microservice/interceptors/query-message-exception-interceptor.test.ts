/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import test from 'ava'
import { throwError } from 'rxjs'

import { QueryMessageException } from '../../../main/microservice/exceptions/query-message-exception.js'
import { QueryMessageExceptionInterceptor } from '../../../main/microservice/interceptors/query-message-exception-interceptor.js'

const rpcArgHost = {
  switchToRpc: () => ({
    getContext: () => ({
      getPattern: () => 'the pattern'
    })
  })
}

const handle = () => {
  return throwError(() => new QueryMessageException('query message exception!'))
}

test('intercept', (t) => {
  t.plan(1)

  const interceptor = new QueryMessageExceptionInterceptor()

  const result = interceptor.intercept(rpcArgHost as any, { handle } as any)

  result.subscribe({
    next: (val) => {
      t.deepEqual(val, {
        __error: {
          message: 'query message exception!',
          name: 'QueryMessageException'
        }
      })
    }
  })
})

test('it ignores exceptions of other types', (t) => {
  t.plan(1)

  const interceptor = new QueryMessageExceptionInterceptor()

  const result = interceptor.intercept(
    rpcArgHost as any,
    {
      handle() {
        return throwError(() => new Error('not a query message exception'))
      }
    } as any
  )

  result.subscribe({
    error: () => {
      t.pass()
    }
  })
})
