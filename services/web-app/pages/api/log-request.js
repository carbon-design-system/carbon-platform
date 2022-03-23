/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Logging } from '@carbon-platform/api/logging'

import { CARBON_INTERNAL_API_SECRET } from '@/config/constants'

const logging = new Logging('web-app', 'log-request-api')

const logRequest = (req, res) => {
  if (!req.body) {
    res.status(400).send('Bad request (no body)')
    return
  }

  const { logMessage, internalApiSecret } = req.body

  if (!logMessage) {
    res.status(400).send('Bad request (no logMessage)')
    return
  }

  if (!internalApiSecret || internalApiSecret !== CARBON_INTERNAL_API_SECRET) {
    logging.warn(`unauthorized access from ${req.socket.remoteAddress}`)
    res.status(401).send('Bad request (no internalApiSecret)')
    return
  }

  logging.info(logMessage)
  res.end('')
}

export default logRequest
