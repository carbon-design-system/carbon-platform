/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { DEV, getRunMode } from '@carbon-platform/api/run-mode'

import { getBaseUrl } from './getBaseUrl'

/**
 * Creates request options for retrieveUser api call including headers and agent if necessary
 *
 * @param {import('next').GetServerSidePropsContext.req} req getServerSideProps request object
 * @returns {RequestInit} request options
 */
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
 * @param {import('next').GetServerSidePropsContext} context - getServerSideProps context object
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
