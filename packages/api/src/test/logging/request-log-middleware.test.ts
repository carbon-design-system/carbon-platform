/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import test from 'ava'

import { Logging, requestLogMiddleware } from '../../main/logging/index.js'
import { buildHttpLogText } from '../../main/logging/request-log-middleware.js'

const logRequest = requestLogMiddleware({ logging: new Logging({ component: 'TestLogger' }) })

const req = {
  httpVersion: '1.1',
  method: 'GET',
  socket: {
    remoteAddress: 'localhost',
    remotePort: '8080'
  },
  originalUrl: '/some/thing',
  hostname: 'example.com',
  headers: {
    'user-agent': 'edge'
  }
}

const res = {
  statusCode: 123,
  getHeader: () => {
    return '456'
  },
  once: () => undefined
}

test('it handles rpc interceptions', (t) => {
  t.plan(1)

  logRequest(req as any, res as any, () => t.pass())
})

test('it returns a well-formed http log message', (t) => {
  const logText = buildHttpLogText(req as any, res as any, '123')

  t.is(
    logText,
    'example.com "GET /some/thing HTTP/1.1" 123 123ms [localhost]:8080 "edge" 456 Bytes'
  )
})
