/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Logging, requestLogMiddleware } from '@carbon-platform/api/logging'
import express from 'express'
import fs from 'fs'
import http from 'http'
import { createProxyMiddleware } from 'http-proxy-middleware'
import https from 'https'

const port = process.env.PORT ?? (process.env.RUNNING_SECURELY === '1' ? 8443 : 8080)

function getCredentials() {
  return {
    key: fs.readFileSync('./certificates/localhost.key'),
    cert: fs.readFileSync('./certificates/localhost.crt')
  }
}

function createNextJsProxy() {
  return createProxyMiddleware('/', {
    target: 'http://localhost:3000',
    ws: true
  })
}

function start() {
  const app = express()
  const nextJsProxy = createNextJsProxy()

  app.use(requestLogMiddleware())
  app.use(nextJsProxy)
  app.disable('X-Powered-By')

  const server =
    process.env.RUNNING_SECURELY === '1'
      ? https.createServer(getCredentials(), app)
      : http.createServer(app)

  server.listen(port, undefined, undefined, () => {
    // Use a one-shot logger for this specific component/log
    new Logging({ component: 'proxy-server' }).info(`listening on port ${port}`)
  })
}

start()
