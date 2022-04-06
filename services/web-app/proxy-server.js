/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const { Logging } = require('@carbon-platform/api/logging')
const { v4: uuidv4 } = require('uuid')
const fs = require('fs')
const http = require('http')
const https = require('https')

const logging = new Logging('web-app', 'express-proxy')

const port = process.env.PORT ?? process.env.RUNNING_SECURELY === '1' ? 8443 : 8080

const app = express()
app.disable('x-powered-by')

const BASE_URL = 'http://localhost:3000'

const nextJsProxy = createProxyMiddleware('/', {
  target: BASE_URL,
  onProxyReq: (_, req) => {
    req.id = uuidv4()
    performance.mark(req.id)
  },
  onProxyRes: (proxyRes, req) => {
    const { method, socket, url } = req
    const { remoteAddress, remotePort } = socket
    const { statusCode } = proxyRes
    const responseTime = performance.measure(req.id)?.duration?.toFixed(2)
    const logMessage = `"${method} ${url}" "${statusCode}" "${responseTime}ms" "${req.get(
      'User-Agent'
    )}" "${remoteAddress}" "${remotePort}"`
    logging.info(logMessage)
    performance.clearMarks(req.id)
    performance.clearMeasures(req.id)
  },
  ws: true
})

const credentials =
  process.env.RUNNING_SECURELY === '1'
    ? {
        key: fs.readFileSync('./certificates/localhost.key'),
        cert: fs.readFileSync('./certificates/localhost.crt')
      }
    : null

app.use(nextJsProxy)

const server =
  process.env.RUNNING_SECURELY === '1'
    ? https.createServer(credentials, app)
    : http.createServer(app)

server.listen(port, undefined, undefined, () => {
  logging.info(`listening on port ${port}`)
})
