/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import '@/styles/styles.scss'

import { MDXProvider } from '@mdx-js/react'
import { DefaultSeo } from 'next-seo'

import Link from '@/components/link'
import { Blockquote, H1, H2, H3, H4, H5, H6, LI, OL, P, UL } from '@/components/markdown'
import defaultSeo from '@/config/seo.json'
import { AuthProvider } from '@/contexts/auth'
import Layout, { LayoutProvider } from '@/layouts/layout'

const components = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  p: P,
  ul: UL,
  ol: OL,
  li: LI,
  a: Link,
  blockquote: Blockquote
}

function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <LayoutProvider>
        <Layout>
          <DefaultSeo {...defaultSeo} />
          <MDXProvider components={components}>
            <Component {...pageProps} />
          </MDXProvider>
        </Layout>
      </LayoutProvider>
    </AuthProvider>
  )
}

export default App
