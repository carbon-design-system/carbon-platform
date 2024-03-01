/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { NextResponse } from 'next/server'

import sendLocalRequest from '@/utils/sendLocalRequest'
import { isValidIbmEmail } from '@/utils/string'

class NotAuthorizedException extends Error {}

function exitWith404(req) {
  const url = req.nextUrl.clone()
  url.pathname = '/404'
  return NextResponse.rewrite(url)
}

async function applyAuthMiddleware(req) {
  if (
    req.nextUrl.pathname === '/404' ||
    req.nextUrl.pathname.startsWith('/api/') ||
    req.nextUrl.pathname.startsWith('/_next/') ||
    req.nextUrl.pathname.startsWith('/vendor/') ||
    req.nextUrl.pathname === 'favicon.ico'
  ) {
    return NextResponse.next()
  }

  const userResponse = await sendLocalRequest(req, '/api/user', true)

  // Guard - non-200 user api response
  if (!userResponse.ok) {
    throw new NotAuthorizedException()
  }

  const user = await userResponse.json()

  // Guard - no valid user
  if (!user?.email) {
    throw new NotAuthorizedException()
  }

  // Guard - not a valid IBMer
  if (!isValidIbmEmail(user.email)) {
    throw new NotAuthorizedException()
  }

  return NextResponse.next()
}

export default async function middleware(req) {
  try {
    await applyAuthMiddleware(req)
  } catch (err) {
    if (err instanceof NotAuthorizedException) {
      return exitWith404(req)
    }
    throw err
  }

  return NextResponse.next()
}
