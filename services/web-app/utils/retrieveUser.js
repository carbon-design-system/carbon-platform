/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import sendLocalRequest from './sendLocalRequest'

/**
 * Retrieves the current user value from the session
 * @param {import('next').GetServerSidePropsContext} context - getServerSideProps context object
 * @returns {User | null} user value
 */
export async function retrieveUser(context) {
  const { req } = context
  if (req.user) {
    return req.user
  }
  const sessionCookie = context.req.cookies?.['connect.sid']
  if (sessionCookie) {
    const userResponse = await sendLocalRequest(req, '/api/user', true)
    if (userResponse.ok) {
      const user = await userResponse.json()
      req.user = user
      return user
    }
  }
  return null
}
