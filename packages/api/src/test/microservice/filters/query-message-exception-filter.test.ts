/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import test from 'ava'

import { Logging } from '../../../main/logging/logging.js'
import { QueryMessageException } from '../../../main/microservice/exceptions/query-message-exception.js'
import { QueryMessageExceptionFilter } from '../../../main/microservice/filters/query-message-exception-filter.js'

test.before(() => {
  Logging.isRemoteLoggingAllowed = false
})

const rpcArgHost = {
  switchToRpc: () => ({
    getContext: () => ({
      getPattern: () => 'the pattern'
    })
  })
}

test('catch', async (t) => {
  t.plan(1)

  const filter = new QueryMessageExceptionFilter()

  const result = filter.catch(new QueryMessageException('a test!'), rpcArgHost as any)

  await result.forEach((val) => {
    t.deepEqual(val, {
      __error: {
        name: QueryMessageException.name,
        message: 'a test!'
      }
    })
  })
})

test('catch with no pattern does not crash', (t) => {
  const customRpcArgHost = {
    switchToRpc: () => ({
      getContext: () => ({
        getPattern: () => undefined
      })
    })
  }

  const filter = new QueryMessageExceptionFilter()

  filter.catch(new QueryMessageException('a test!'), customRpcArgHost as any)

  t.pass()
})
