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

const port = process.env.PORT ?? (process.env.RUNNING_SECURELY === '1' ? 8443 : 8080)
const logging = new Logging({ component: 'RequestLogger' })

function getCredentials() {
  return {
    key: fs.readFileSync('./certificates/localhost.key'),
    cert: fs.readFileSync('./certificates/localhost.crt')
  }
}

async function logRequest(proxyRes, req) {
  const { httpVersion, method, socket, url, hostname } = req
  const { remoteAddress, remotePort } = socket
  const { statusCode } = proxyRes
  const responseTime = performance.measure(req.id, req.id)?.duration?.toFixed(4)

  const logParts = [
    hostname,
    '"' + method + ' ' + url + ' HTTP/' + httpVersion + '"',
    statusCode,
    responseTime + 'ms',
    '[' + remoteAddress + ']:' + remotePort,
    '"' + req.get('User-Agent') + '"'
  ]

  await logging.info(logParts.join(' '))
}

function startBenchmark(req) {
  req.id = uuidv4()
  performance.mark(req.id)
}

function clearBenchmark(req) {
  performance.clearMarks(req.id)
  performance.clearMeasures(req.id)
}

function createNextJsProxy() {
  return createProxyMiddleware('/', {
    target: 'http://localhost:3000',
    onProxyReq: (_, req) => {
      startBenchmark(req)
    },
    onProxyRes: (proxyRes, req) => {
      logRequest(proxyRes, req)
      clearBenchmark(req)
    },
    ws: true
  })
}

function start() {
  const app = express()
  const nextJsProxy = createNextJsProxy()

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
