/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import '@/styles/styles.scss'

import { MDXProvider } from '@mdx-js/react'
import { useRouter } from 'next/router'
import { DefaultSeo } from 'next-seo'
import { useEffect } from 'react'

import components from '@/components/mdx'
import defaultSeo from '@/config/seo.json'
import { AuthProvider } from '@/contexts/auth'
import { RouteProvider } from '@/contexts/route'
import Layout, { LayoutProvider } from '@/layouts/layout'

function useNormalScrollRoutes() {
  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      document.documentElement.classList.add('normal-scroll')
    })
    router.events.on('routeChangeComplete', () => {
      document.documentElement.classList.remove('normal-scroll')
    })
  }, [router.events])
}

function App({ Component, pageProps }) {
  useNormalScrollRoutes()

  return (
    <AuthProvider>
      <LayoutProvider>
        <RouteProvider>
          <Layout>
            <DefaultSeo {...defaultSeo} />
            <MDXProvider components={components}>
              <Component {...pageProps} />
            </MDXProvider>
          </Layout>
        </RouteProvider>
      </LayoutProvider>
    </AuthProvider>
  )
}

export default App
