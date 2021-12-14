/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useAuth } from 'contexts/auth'
import withAuth from 'HOCs/withAuth'
import { NextSeo } from 'next-seo'
import { useContext, useEffect } from 'react'

import { standardsNavData } from '@/data/nav-data'
import { LayoutContext } from '@/layouts/layout'

const ProtectedPageWithAuth = () => {
  const { setNavData } = useContext(LayoutContext)
  const { isAuthenticated, loading, user } = useAuth()

  const seo = {
    title: 'Standards'
  }

  useEffect(() => {
    setNavData(standardsNavData)
  }, [setNavData])

  return (
    <>
      <NextSeo {...seo} />
      Welcome to the Protected Page!
      <div>User: {JSON.stringify(user ?? {})}</div>
      <div>isAuthenticated: {isAuthenticated?.toString()}</div>
      <div>isLoading: {loading?.toString()}</div>
    </>
  )
}

export default withAuth(ProtectedPageWithAuth, (route, query) => {
  // User will be required to authenticate if the requested host is equal to 'github.ibm.com'
  return query.host === 'github.ibm.com'
})
