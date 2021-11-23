/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useAuth } from 'contexts/auth'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function withAuth(Component, shouldAuthenticate = () => true) {
  // eslint-disable-next-line react/display-name
  return (props) => {
    const { isAuthenticated, loading } = useAuth()
    const [authRequired, setAuthRequired] = useState()
    const router = useRouter()

    useEffect(() => {
      setAuthRequired(shouldAuthenticate(router.pathname, router.query))
    }, [])

    useEffect(() => {
      if (!loading && !isAuthenticated && authRequired) {
        router.replace(`/login?next=${router.asPath}`)
      }
    }, [loading, router, isAuthenticated, authRequired])

    if (!authRequired || isAuthenticated) {
      return <Component {...props} />
    } else {
      return null
    }
  }
}
