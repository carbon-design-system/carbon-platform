/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { DEV, getRunMode } from '@carbon-platform/run-mode'

import { getBaseUrl } from './getBaseUrl'

function getRequestOptions(req) {
  const reqOptions = {
    headers: { cookie: req.headers.cookie }
  }
  if (getRunMode() === DEV) {
    const Agent = require('https').Agent
    reqOptions.agent = new Agent({ rejectUnauthorized: false })
  }
  return reqOptions
}

/**
 * Retrieves the current user value from the session
 * @param {GetServerSidePropsContext} context - getServerSideProps context object
 * @returns {User | null} user value
 */
export async function retrieveUser(context) {
  if (context.req.user) {
    return context.req.user
  }
  const sessionCookie = context.req.cookies?.['connect.sid']
  if (sessionCookie) {
    const userResponse = await fetch(`${getBaseUrl()}/api/user`, getRequestOptions(context.req))
    if (userResponse.ok) {
      const user = await userResponse.json()
      context.req.user = user
      return user
    }
  }
  return null
}
