/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import http from 'http'

import { __test__, run } from '../main/server'

const { requestHandler } = __test__

jest.mock('http')
const mockedHttp = http as jest.Mocked<typeof http>

test('it creates a server and listens on it', () => {
  const mockedHttpServer = {
    listen: jest.fn()
  } as any
  mockedHttp.createServer.mockReturnValue(mockedHttpServer)

  expect(run()).toBeUndefined()
  expect(mockedHttpServer.listen).toHaveBeenCalledWith(process.env.PORT || 3000)

  mockedHttp.createServer.mockRestore()
})

test('it responds to incoming requests with HTTP 200', () => {
  const request = {}
  const response = {
    writeHead: jest.fn(),
    end: jest.fn()
  }

  requestHandler(request as any, response as any)

  expect(response.writeHead).toHaveBeenCalledWith(200)
  expect(response.end).toHaveBeenCalled()
})
