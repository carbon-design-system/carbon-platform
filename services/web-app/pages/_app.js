/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import '@/styles/styles.scss'

import { DefaultSeo } from 'next-seo'

import defaultSeo from '@/config/seo.json'
import { AuthProvider } from '@/contexts/auth'
import Layout, { LayoutProvider } from '@/layouts/layout'

function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <LayoutProvider>
        <Layout>
          <DefaultSeo {...defaultSeo} />
          <Component {...pageProps} />
        </Layout>
      </LayoutProvider>
    </AuthProvider>
  )
}

export default App
