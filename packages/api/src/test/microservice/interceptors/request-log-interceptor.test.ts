/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import test from 'ava'
import { of as observableOf } from 'rxjs'

import { Logging } from '../../../main/logging/index.js'
import { RequestLogInterceptor } from '../../../main/microservice/interceptors/request-log-interceptor.js'

const logging = new Logging({ component: 'test-component' })

test('it handles rpc interceptions', (t) => {
  t.plan(1)

  const next = {
    handle: () => {
      return {
        pipe: () => {
          return observableOf('hello test!')
        }
      }
    }
  }

  const executionContext = {
    getType: () => 'rpc',
    getClass: () => ({ name: 'MyClass' }),
    getHandler: () => ({ name: 'myHandler' }),
    switchToRpc: () => ({ getData: () => 'asdf' })
  }

  const interceptor = new RequestLogInterceptor({ logging })

  interceptor.intercept(executionContext as any, next as any)

  return interceptor.intercept(executionContext as any, next as any).forEach(() => {
    t.pass()
  })
})

test('it handles http interceptions', (t) => {
  t.plan(1)

  const next = {
    handle: () => {
      return {
        pipe: () => {
          return observableOf('hello test!')
        }
      }
    }
  }

  const executionContext = {
    getArgs: () => [],
    getType: () => 'http',
    getClass: () => ({ name: 'MyClass' }),
    getHandler: () => ({ name: 'myHandler' }),
    switchToHttp: () => ({
      getRequest: () => ({
        httpVersion: '1.1',
        method: 'GET',
        socket: {
          remoteAddress: 'localhost',
          remotePort: 12345
        },
        url: '/some/cool/url',
        hostname: 'example.com',
        get: () => 'wow'
      }),
      getResponse: () => ({
        statusCode: 200
      })
    })
  }

  const interceptor = new RequestLogInterceptor({ logging })

  return interceptor.intercept(executionContext as any, next as any).forEach(() => {
    t.pass()
  })
})

test("it doesn't break when given an unknown type", (t) => {
  t.plan(1)

  const next = {
    handle: () => {
      return {
        pipe: () => {
          return observableOf('hello test!')
        }
      }
    }
  }

  const executionContext = {
    getType: () => 'not_real'
  }

  const interceptor = new RequestLogInterceptor({ logging })

  return interceptor.intercept(executionContext as any, next as any).forEach(() => {
    t.pass()
  })
})

test('it returns the correct log text builder', (t) => {
  let builder = RequestLogInterceptor.getLogTextBuilder('http')
  t.is(builder?.name, 'buildHttpLogText')

  builder = RequestLogInterceptor.getLogTextBuilder('rpc')
  t.is(builder?.name, 'buildRpcLogText')
})

test('it returns a well-formed http log message', (t) => {
  const logText = RequestLogInterceptor.buildHttpLogText(
    {
      switchToHttp: () => ({
        getRequest: () => ({
          httpVersion: '1.1',
          method: 'GET',
          socket: {
            remoteAddress: 'localhost',
            remotePort: '8080'
          },
          url: '/some/thing',
          hostname: 'example.com',
          headers: {
            'user-agent': 'edge'
          }
        }),
        getResponse: () => ({
          statusCode: 'h'
        })
      })
    } as any,
    'result is a string',
    '123'
  )

  t.is(
    logText,
    'example.com "GET /some/thing HTTP/1.1" h 123ms [localhost]:8080 "edge" out: string'
  )
})

test('it returns a well-formed rpc log message', (t) => {
  const logText = RequestLogInterceptor.buildRpcLogText(
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

  t.is(logText, 'MyClass#handlerMethod in: {"it":"is some data"} out: string 123ms')
})
