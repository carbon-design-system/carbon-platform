/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { NextResponse } from 'next/server'

import sendLocalRequest from '@/utils/sendLocalRequest'
import { isValidIbmEmail } from '@/utils/string'

class NotAuthorizedError extends Error {}

function exitWith404(req) {
  const url = req.nextUrl.clone()
  url.pathname = '/404'
  return NextResponse.rewrite(url)
}

function logIncomingRequest(req) {
  sendLocalRequest(req, '/api/log-request', false, 'POST', {
    logMessage: `"${req.method} ${req.nextUrl.pathname}" "${
      req.ua.ua
    }" "${req.ip}"`
  })
}

async function applyAuthMiddleware(req) {
  if (req.nextUrl.pathname === '/404' || req.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  const userResponse = await sendLocalRequest(req, '/api/user', true)

  // Guard - non-200 user api response
  if (!userResponse.ok) {
    throw new NotAuthorizedError()
  }

  const user = await userResponse.json()

  // Guard - no valid user
  if (!user?.email) {
    throw new NotAuthorizedError()
  }

  // Guard - not a valid IBMer
  if (!isValidIbmEmail(user.email)) {
    throw new NotAuthorizedError()
  }

  return NextResponse.next()
}

export async function middleware(req) {
  try {
    await logIncomingRequest(req)
    await applyAuthMiddleware(req)
  } catch (err) {
    return exitWith404(req)
  }

  return NextResponse.next()
}
