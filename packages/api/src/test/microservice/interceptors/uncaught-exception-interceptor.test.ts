/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import test from 'ava'
import { throwError } from 'rxjs'

import { Logging } from '../../../main/logging/index.js'
import { UncaughtExceptionInterceptor } from '../../../main/microservice/interceptors/uncaught-exception-interceptor.js'

const handle = () => {
  return throwError(() => new Error('a test!'))
}

test('intercept', (t) => {
  t.plan(2)

  const logging = new Logging({ component: 'TestComponent' })
  const interceptor = new UncaughtExceptionInterceptor({ logging })

  const result = interceptor.intercept({} as any, { handle } as any)

  result.subscribe({
    error(err) {
      t.true(err instanceof Error)
      t.is((err as Error).message, 'a test!')
    }
  })
})
