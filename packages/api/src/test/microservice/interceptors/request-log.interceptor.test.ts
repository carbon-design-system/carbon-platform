/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs'

import { Logging } from '../../../main/logging'
import { RequestLogInterceptor } from '../../../main/microservice/interceptors/request-log.interceptor'

const infoSpy = jest.spyOn(Logging.prototype, 'info').mockImplementation(jest.fn())

describe('intercept', () => {
  const mockedNext = {
    handle: jest.fn().mockReturnValue({
      pipe: jest.fn((operatorFunction: MonoTypeOperatorFunction<any>) => {
        return operatorFunction(
          new Observable((subscriber) => {
            subscriber.next('hello test!')
            subscriber.complete()
          })
        )
      })
    })
  }

  it('handles rpc interceptions', async () => {
    const mockedExecutionContext = {
      getType: () => 'rpc',
      getClass: () => ({ name: 'MyClass' }),
      getHandler: () => ({ name: 'myHandler' }),
      switchToRpc: jest.fn().mockReturnValue({
        getData: () => 'asdf'
      })
    }
    const interceptor = new RequestLogInterceptor()

    const thing = interceptor.intercept(mockedExecutionContext as any, mockedNext as any)

    thing.forEach((val) => {
      // Create a dummy assertion to ensure we get the val
      expect(val).toBe('hello test!')
    })

    expect(infoSpy).toHaveBeenCalledWith(
      expect.stringContaining('MyClass#myHandler in: "asdf" out: string')
    )
    expect.assertions(2)
  })

  it('handles http interceptions', async () => {
    const mockedExecutionContext = {
      getType: () => 'http',
      getClass: () => ({ name: 'MyClass' }),
      getHandler: () => ({ name: 'myHandler' }),
      switchToHttp: jest.fn().mockReturnValue({
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
    const interceptor = new RequestLogInterceptor()

    const thing = interceptor.intercept(mockedExecutionContext as any, mockedNext as any)

    thing.forEach((val) => {
      // Create a dummy assertion to ensure we get the val
      expect(val).toBe('hello test!')
    })

    expect(infoSpy).toHaveBeenCalledWith(
      expect.stringMatching(
        /example\.com "GET \/some\/cool\/url HTTP\/1\.1" 200 [0-9.]+ms \[localhost\]:12345 "wow" out: string/
      )
    )
    expect.assertions(2)
  })
})
