/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { doStuff } from '@carbon-platform/logging'
import http, { IncomingMessage, ServerResponse } from 'http'

const port = process.env.PORT || 3000
const logging = new Logging('logging-service')

function requestHandler(request: http.IncomingMessage, response: http.ServerResponse) {
  logging.info(`request ${request.url}`)

  response.writeHead(200)
  response.end()
}

  http
    .createServer(function (request: IncomingMessage, response: ServerResponse) {
      console.log('request ', request?.url)

const __test__ = {
  requestHandler
}

export { __test__, run }
