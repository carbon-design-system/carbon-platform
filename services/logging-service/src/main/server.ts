/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { info } from '@carbon-platform/logging'
import http from 'http'

const port = process.env.PORT || 3000

function run() {
  http
    .createServer(function (request: any, response: any) {
      info(`request ${request.url}`)

      response.writeHead(200)
      response.end()
    })
    .listen(port)
  info(`Server running at port ${port}`)
}

export { run }
