/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { NextSeo } from 'next-seo'

import RemoteMdxLoader from '@/components/remote-mdx-loader'
import { getRemoteMdxData } from '@/lib/github'

const RemoteMdxTest = ({ source }) => {
  const seo = {
    title: 'Remote Mdx'
  }

  return (
    <>
      <NextSeo {...seo} />

      <RemoteMdxLoader source={source} />
    </>
  )
}

export const getStaticProps = async () => {
  const mdxSource = await getRemoteMdxData(
    {
      host: 'github.com',
      org: 'carbon-design-system',
      repo: 'carbon-website',
      library: 'carbon-website',
      ref: 'main'
    },
    // '/src/pages/all-about-carbon/what-is-carbon.mdx'
    // '/src/pages/components/accordion/style.mdx'
    // '/src/pages/community/component-index.mdx' // this works with ComponentIndexPage removed

    // '/src/pages/all-about-carbon/partners.mdx' // ReferenceError: dividedSection is not defined

    // '/src/pages/community/patterns/chatbot/overview.mdx' // has nested <Tag> components

    // '/src/pages/components/dropdown/code.mdx'
    // '/src/pages/components/code-snippet/code.mdx'

    '/src/pages/components/date-picker/accessibility.mdx'
  )

  return {
    props: {
      source: mdxSource
    }
  }
}

export default RemoteMdxTest
