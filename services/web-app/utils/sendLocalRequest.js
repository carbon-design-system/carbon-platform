/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cookie from 'cookie'

/**
 * Retrieves and returns serialized auth cookie
 *
 * @param {NextRequest} req getServerSideProps request object
 * @returns {string} serialized auth cookie
 */
function getAuthCookie(req) {
  const sessionCookie = req.cookies['connect.sid']
  return sessionCookie ? cookie.serialize('connect.sid', sessionCookie) : ''
}

/**
 * Sends an http request internally
 * @param {NextRequest} req - Original request object that came through the middleware
 * or getServerSideProps.context
 * @param {string} path - Relative path to request
 * @param {boolean} forwardAuthCookie - Should auth cookie be forwarded to local request
 * @param {string} method - Request method to use, default to 'GET'
 * @param {Object} body - Body object to send to fetch command
 * @param {Object} requestOptions - Additional request options to send to the fetch command
 * @returns {Promise<Response>} Promise return from fetch()
 */
export default function sendLocalRequest(
  req,
  path,
  forwardAuthCookie = false,
  method = 'GET',
  body = null,
  requestOptions = {}
) {
  const protocol = process.env.RUNNING_SECURELY === '1' ? 'https' : 'http'

  const port = req.nextUrl?.port ?? req.socket?.localPort
  const requestUrl = `${protocol}://localhost:${port}/${path}`

  const reqOptions = {
    method,
    headers: {
      'Content-Type': 'application/json',
      cookie: forwardAuthCookie ? getAuthCookie(req) : ''
    },
    ...requestOptions
  }

  if (body !== null) {
    reqOptions.body = JSON.stringify(body)
  }

  return fetch(requestUrl, reqOptions)
}
