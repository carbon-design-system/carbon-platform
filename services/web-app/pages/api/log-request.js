/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Logging } from '@carbon-platform/api/logging'

const logging = new Logging('web-app', 'log-request-api')

const logMessage = (req, res) => {
  if (!req.body) {
    console.log('bad request no body')
    res.status(400).send('Bad request (no body)')
    return
  }

  if (!req.body.logMessage) {
    console.log('bad request no logmessage')
    res.status(400).send('Bad request (no logMessage)')
    return
  }

  // TODO: block external requests
  logging.info(req.body.logMessage)
}

export default logMessage
