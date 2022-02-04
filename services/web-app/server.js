/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
//
// The purpose of this file is to allow https localhost development.
// https://medium.com/responsetap-engineering/nextjs-https-for-a-local-dev-server-98bb441eabd7
//
const { createServer } = require('https')
const next = require('next')
const fs = require('fs')
const { RunMode, getRunMode, loadEnvVars } = require('@carbon-platform/api/runtime')

const { PORT } = loadEnvVars({ PORT: '443' })

const hostname = 'localhost'

const isDevMode = getRunMode() === RunMode.Dev
const app = next({ dev: isDevMode, hostname, port: PORT })
const handle = app.getRequestHandler()
const httpsOptions = {
  key: fs.readFileSync('./certificates/localhost.key'),
  cert: fs.readFileSync('./certificates/localhost.crt')
}
app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const reqUrl = new URL(req.url, `https://localhost:${PORT}`).toString()
    handle(req, res, reqUrl)
  }).listen(PORT, (err) => {
    if (err) throw err
    console.log(`> Server started on https://localhost:${PORT}`)
  })
})
