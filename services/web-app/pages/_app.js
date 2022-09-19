/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import '@/styles/styles.scss'

import { MDXProvider } from '@mdx-js/react'
import { useRouter } from 'next/router'
import Script from 'next/script'
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
    <>
      <Script id="ibm-analytics" type="text/javascript">
        {`window._ibmAnalytics = {
          settings: {
            isSpa: true,
            tealiumProfileName: 'ibm-web-app'
          },
          onLoad: [['ibmStats.pageview', []]]
        };
        window.digitalData = {
          page: {
            pageInfo: {
              language: 'en-US',
              ibm: {
                siteId: "CARBON_DESIGN_SYSTEM",
                country: "US",
                industry: "design",
                owner: "carbon@us.ibm.com",
              }
            },
            category: {
              primaryCategory: 'PC010',
            }
          }
        };`}
      </Script>
      <Script
        src="//1.www.s81c.com/common/stats/ibm-common.js"
        type="text/javascript"
        async="async"
      ></Script>
      <Script src="/vendor/prismjs/prism.min.js" type="text/javascript" async="async"></Script>
      <LayoutProvider>
        <Layout>
          <DefaultSeo {...defaultSeo} />
          <MDXProvider components={components}>
            <Component {...pageProps} />
          </MDXProvider>
        </Layout>
      </LayoutProvider>
    </>
  )
}

export default App
