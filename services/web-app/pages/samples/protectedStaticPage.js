/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useAuth } from 'contexts/auth'
import { useEffect } from 'react'

import RequireAuth from '@/components/auth/require-auth'
import { isValidIbmEmail } from '@/utils/string'

import FourOhFour from '../404'

const ProtectedStaticPage = () => {
  const { isAuthenticated, loading, user } = useAuth()

  useEffect(() => {
    if (!loading && isAuthenticated) {
      // fetch protected data here
    }
  }, [loading, isAuthenticated])

  // eslint-disable-next-line multiline-ternary
  return loading ? null : (
    // show page if user is authenticated and email is valid ibm email, else show 404 page
    <RequireAuth
      fallback={FourOhFour}
      isAuthorized={isAuthenticated && isValidIbmEmail(user?.email ?? '')}
    >
      <>
        Welcome to the Protected Page!
        <div>User: {JSON.stringify(user ?? {})}</div>
        <div>isAuthenticated: {isAuthenticated?.toString()}</div>
        <div>isLoading: {loading?.toString()}</div>
      </>
    </RequireAuth>
  )
}

// do NOT fetch protected data here
export async function getStaticProps(/* context */) {
  return {
    props: {} // will be passed to the page component as props
  }
}

export default ProtectedStaticPage
