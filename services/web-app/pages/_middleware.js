/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { NextResponse } from 'next/server'

import { isValidIbmEmail } from '@/utils/string'

import { getEnvVar } from '../../../packages/api/enforce-env-vars'
import { getRunMode, RunMode } from '../../../packages/api/run-mode'

/**
 * Creates request options for retrieveUser api call including headers and agent if necessary
 *
 * @param {NextRequest} req getServerSideProps request object
 * @returns {RequestInit} request options
 */
function getRequestOptions(req) {
  let cookies = ''
  Object.entries(req.cookies).forEach(([key, val]) => {
    cookies += `${key}=${val}; `
  })
  return {
    headers: { cookie: cookies }
  }
}
export async function middleware(req) {
  if (req.nextUrl.pathname === '/404' || req.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next()
  }
  const protocol =
    getRunMode === RunMode.Prod || getEnvVar('RUNNING_SECURELY', '0') === '1' ? 'https' : 'http'
  const userResponse = await fetch(
    `${protocol}://localhost:${req.nextUrl.port}/api/user`,
    getRequestOptions(req)
  )
  let user
  if (userResponse.ok) {
    user = await userResponse.json()
  }
  if (!isValidIbmEmail(user?.email ?? '')) {
    const url = req.nextUrl.clone()
    url.pathname = '/404'
    return NextResponse.rewrite(url)
  }
  return NextResponse.next()
}
