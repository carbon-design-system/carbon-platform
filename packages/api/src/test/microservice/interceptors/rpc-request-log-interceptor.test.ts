/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import test from 'ava'
import { of as observableOf, throwError } from 'rxjs'

import { Logging } from '../../../main/logging/index.js'
import {
  __test__,
  RpcRequestLogInterceptor
} from '../../../main/microservice/interceptors/rpc-request-log-interceptor.js'

const logging = new Logging({ component: 'TestComponent' })

const success = () => {
  return observableOf('hello test')
}
const failure = () => {
  return throwError(() => 'hello test')
}

test('it handles rpc interceptions', (t) => {
  t.plan(1)

  const next = {
    handle: success
  }

  const executionContext = {
    getType: () => 'rpc',
    getClass: () => ({ name: 'MyClass' }),
    getHandler: () => ({ name: 'myHandler' }),
    switchToRpc: () => ({ getData: () => 'asdf' })
  }

  const interceptor = new RpcRequestLogInterceptor({ logging })

  return interceptor.intercept(executionContext as any, next as any).forEach(() => {
    t.pass()
  })
})

test('it handles rpc interceptions that throw', (t) => {
  t.plan(1)

  const next = {
    handle: failure
  }

  const executionContext = {
    getType: () => 'rpc',
    getClass: () => ({ name: 'MyClass' }),
    getHandler: () => ({ name: 'myHandler' }),
    switchToRpc: () => ({ getData: () => 'asdf' })
  }

  const interceptor = new RpcRequestLogInterceptor({ logging })

  interceptor.intercept(executionContext as any, next as any).subscribe({
    error() {
      t.pass()
    }
  })
})

test("it doesn't break when given an unknown type", (t) => {
  t.plan(1)

  const next = {
    handle: success
  }

  const executionContext = {
    getType: () => 'not_real'
  }

  const interceptor = new RpcRequestLogInterceptor({ logging })

  return interceptor.intercept(executionContext as any, next as any).subscribe(() => {
    t.pass()
  })
})

test('it returns a well-formed rpc log message', (t) => {
  const logText = RpcRequestLogInterceptor.buildRpcLogText(
    {
      switchToRpc: () => ({
        getData: () => ({ it: 'is some data' })
      }),
      getClass: () => ({ name: 'MyClass' }),
      getHandler: () => ({ name: 'handlerMethod' })
    } as any,
    'result is a string',
    '123'
  )

  t.is(logText, 'MyClass#handlerMethod in: {"it":"is some data"} out: result is a string 123ms')
})

test('it truncates long rpc log messages', (t) => {
  const dataToTruncate = { tooLong: '' }
  for (let i = 0; i < 501; i++) {
    dataToTruncate.tooLong += 'a'
  }

  const logText = RpcRequestLogInterceptor.buildRpcLogText(
    {
      switchToRpc: () => ({
        getData: () => dataToTruncate
      }),
      getClass: () => ({ name: 'MyClass' }),
      getHandler: () => ({ name: 'handlerMethod' })
    } as any,
    dataToTruncate.tooLong,
    '123'
  )

  t.is(
    logText,
    'MyClass#handlerMethod in: ' +
      JSON.stringify(dataToTruncate).substring(0, __test__.MAX_LOG_PART_SIZE) +
      '... (truncated) out: ' +
      dataToTruncate.tooLong.substring(0, __test__.MAX_LOG_PART_SIZE) +
      '... (truncated) 123ms'
  )
})
