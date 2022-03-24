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
    res.status(401).send('Unauthorized.')
    return
  }

  logging.info(logMessage)
  res.end('')
}

export default logRequest
