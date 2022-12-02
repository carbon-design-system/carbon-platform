/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { NextFunction, Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'

import { Logging } from './logging.js'

function buildHttpLogText(req: Request, res: Response, responseTime: string): string {
  const { httpVersion, method, socket, originalUrl, hostname, headers } = req
  const { remoteAddress, remotePort } = socket
  const { statusCode } = res

  const logParts = [
    hostname,
    '"' + method + ' ' + originalUrl + ' HTTP/' + httpVersion + '"',
    statusCode,
    responseTime + 'ms',
    '[' + remoteAddress + ']:' + remotePort,
    '"' + headers['user-agent'] + '"',
    res.getHeader('content-length') ? res.getHeader('content-length') + ' Bytes' : ''
  ]

  return logParts.join(' ')
}

function requestLogMiddleware(config?: { logging: Logging }) {
  const logging = config?.logging || new Logging({ component: 'RequestLogger' })

  return function logRequest(req: Request, res: Response, next: NextFunction) {
    const performanceId = uuidv4()
    performance.mark(performanceId)

    res.once('finish', () => {
      const responseTime = performance.measure(performanceId, performanceId)?.duration?.toFixed(2)

      const logText = buildHttpLogText(req, res, responseTime)

      logging.info(logText)
    })

    next()
  }
}

export { buildHttpLogText, requestLogMiddleware }
