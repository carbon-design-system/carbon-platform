/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getRunMode, RunMode } from '@carbon-platform/api/runtime'
import cookie from 'cookie'
import { NextResponse } from 'next/server'

import { isValidIbmEmail } from '@/utils/string'

/**
 * Creates request options for retrieveUser api call including headers and agent if necessary
 *
 * @param {NextRequest} req getServerSideProps request object
 * @returns {RequestInit} request options
 */
function getRequestOptions(req) {
  const sessionCookie = req.cookies['connect.sid']
  const cookies = sessionCookie ? cookie.serialize('connect.sid', sessionCookie) : ''
  return {
    headers: { cookie: cookies }
  }
}

function exitWith404(req) {
  const url = req.nextUrl.clone()
  url.pathname = '/404'
  return NextResponse.rewrite(url)
}

export async function middleware(req) {
  if (req.nextUrl.pathname === '/404' || req.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  const protocol =
    getRunMode === RunMode.Prod || process.env.RUNNING_SECURELY === '1' ? 'https' : 'http'
  const userResponse = await fetch(
    `${protocol}://localhost:${req.nextUrl.port}/api/user`,
    getRequestOptions(req)
  )

  // Guard - non-200 user api response
  if (!userResponse.ok) {
    return exitWith404(req)
  }

  const user = await userResponse.json()

  // Guard - no valid user
  if (!user?.email) {
    return exitWith404(req)
  }

  // Guard - not a valid IBMer
  if (!isValidIbmEmail(user.email)) {
    return exitWith404(req)
  }

  return NextResponse.next()
}
