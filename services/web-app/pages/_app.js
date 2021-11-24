/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/* eslint-disable simple-import-sort/imports */
/*
 * TODO: fix import sorting once Carbon prefix bug is resolved. Layout must be imported before
 * using `carbon-components-react`.
 * @see https://github.com/carbon-design-system/carbon/discussions/9723
 */
import '@/styles/styles.scss'

import Layout, { LayoutProvider } from '@/layouts/layout'
import MediaQueryProvider from '@/contexts/media-query'

import { unstable_FeatureFlags as FeatureFlags } from 'carbon-components-react'
import { DefaultSeo } from 'next-seo'

import defaultSeo from '@/config/seo.json'

function App({ Component, pageProps }) {
  return (
    <MediaQueryProvider>
      <FeatureFlags flags={{ 'enable-css-grid': true }}>
        <LayoutProvider>
          <Layout>
            <DefaultSeo {...defaultSeo} />
            <Component {...pageProps} />
          </Layout>
        </LayoutProvider>
      </FeatureFlags>
    </MediaQueryProvider>
  )
}

export default App
