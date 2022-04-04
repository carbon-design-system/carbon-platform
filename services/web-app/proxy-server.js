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
const { getRunMode, RunMode } = require('@carbon-platform/api/runtime')

const logging = new Logging('web-app', 'express-proxy')

const port = process.env.PORT || 3000

const app = express()
app.disable('x-powered-by')

const protocol =
  getRunMode() === RunMode.Standard || process.env.RUNNING_SECURELY === '1' ? 'https' : 'http'
const BASE_URL = `${protocol}://localhost:3001`

const nextJsProxy = createProxyMiddleware('/', {
  target: BASE_URL,
  changeOrigin: true,
  secure: getRunMode() === RunMode.Standard,
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
  }
})

app.use(apiProxy)

app.listen(port, () => {
  logging.info(`listening on port ${port}`)
})
