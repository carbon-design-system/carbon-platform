/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@/styles/styles.scss'

import Layout, { LayoutProvider } from '@/layouts/layout'

import { DefaultSeo } from 'next-seo'
import { unstable_FeatureFlags as FeatureFlags } from 'carbon-components-react'
import defaultSeo from '@/config/seo.json'

function App({ Component, pageProps }) {
  return (
    <FeatureFlags flags={{ 'enable-css-grid': true }}>
      <LayoutProvider>
        <Layout>
          <DefaultSeo {...defaultSeo} />
          <Component {...pageProps} />
        </Layout>
      </LayoutProvider>
    </FeatureFlags>
  )
}

export default App
