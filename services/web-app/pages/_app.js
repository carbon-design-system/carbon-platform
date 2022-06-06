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
import Layout, { LayoutProvider } from '@/layouts/layout'

function useNormalScrollRoutes() {
  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      document.documentElement.classList.add('normal-scroll')
    })
    router.events.on('routeChangeComplete', () => {
      document.documentElement.classList.remove('normal-scroll')
      // collect analytics data
      window?.ibmStats?.pageview()
    })
  }, [router.events])
}

function App({ Component, pageProps }) {
  useNormalScrollRoutes()

  return (
    <LayoutProvider>
      <Layout>
        <DefaultSeo {...defaultSeo} />
        <MDXProvider components={components}>
          <Component {...pageProps} />
        </MDXProvider>
      </Layout>
    </LayoutProvider>
  )
}

export default App
