/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
//
// The purpose of this file is to allow https localhost development.
// https://medium.com/responsetap-engineering/nextjs-https-for-a-local-dev-server-98bb441eabd7
//
const { createServer } = require('https')
// eslint-disable-next-line node/no-deprecated-api
const { parse } = require('url')
const next = require('next')
const fs = require('fs') // this is a test

const PORT = 443

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const httpsOptions = {
  key: fs.readFileSync('./certificates/localhost.key'),
  cert: fs.readFileSync('./certificates/localhost.crt')
}
app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  }).listen(PORT, (err) => {
    if (err) throw err
    console.log(`> Server started on https://localhost:${PORT}`)
  })
})
