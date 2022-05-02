/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useState } from 'react'

import { LayoutContext } from '@/layouts/layout'
export const RouteContext = createContext()

export const RouteProvider = ({ children }) => {
  const router = useRouter()
  const { setSideNavExpanded } = useContext(LayoutContext)

  const [routeHistory, setRouteHistory] = useState(() => {
    if (typeof window === 'undefined') return []

    const savedHistory = sessionStorage.getItem('history:routes')

    return savedHistory !== null ? JSON.parse(savedHistory) : []
  })

  useEffect(() => {
    sessionStorage.setItem('history:routes', JSON.stringify(routeHistory))
  }, [routeHistory])

  useEffect(() => {
    const handleRouteChange = () => {
      // Collapse the side nav for small and medium breakpoint when navigating to a new page.
      setSideNavExpanded(false)

      // Save at maximum 100 historical routes to session storage. Only save the NextJS router
      // pathnames so the URL query values (platform data) are not persisted.
      setRouteHistory((urls) => [router.pathname, ...urls].slice(0, 100))
    }

    router.events.on('routeChangeStart', handleRouteChange)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [routeHistory, router.events, router.pathname, setSideNavExpanded])

  const value = {
    routeHistory
  }

  return <RouteContext.Provider value={value}>{children}</RouteContext.Provider>
}
