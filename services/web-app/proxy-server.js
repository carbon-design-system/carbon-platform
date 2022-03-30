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

const logging = new Logging('web-app', 'express-proxy')

const app = express()
const port = process.env.PORT || 3000
const BASE_URL = process.env.WEB_APP_BASE_URL || 'http://localhost:3001'

const apiProxy = createProxyMiddleware('/', {
  target: BASE_URL,
  changeOrigin: true,
  onProxyRes: (proxyRes, req) => {
    const { method, socket, url } = req
    const { remoteAddress, remotePort } = socket
    const { statusCode } = proxyRes
    const responseTime = performance.measure(req.id)?.duration?.toFixed(2)
    const logMessage = `"${method} ${url}" "${statusCode}" "${responseTime}ms" "${req.get(
      'User-Agent'
    )}" "${remoteAddress}" "${remotePort}"`
    logging.info(logMessage)
  },
  onProxyReq: (_, req) => {
    req.id = uuidv4()
    performance.mark(req.id)
  }
})

app.use(apiProxy)

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
