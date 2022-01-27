/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Logging } from '@carbon-platform/api/logging'
import { getRunMode } from '@carbon-platform/api/run-mode'
import http from 'http'

console.log(getRunMode())

const port = process.env.PORT || 3000
const logger = new Logging('logging-service', 'test-server')

function requestHandler(request: http.IncomingMessage, response: http.ServerResponse) {
  logger.info(`request ${request.url}`)

  response.writeHead(200)
  response.end()
}

function run() {
  http.createServer(requestHandler).listen(port)
  logger.info(`Server running at port ${port}`)
}

const __test__ = {
  requestHandler
}

export { __test__, run }
