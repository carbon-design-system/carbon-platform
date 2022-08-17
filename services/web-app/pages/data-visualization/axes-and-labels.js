/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { NextSeo } from 'next-seo'

import RemoteMdxLoader from '@/components/remote-mdx-loader'
import { getRemoteMdxData } from '@/lib/github'

const RemoteMdxPage = ({ source }) => {
  const seo = {
    title: 'Axes and labels'
  }

  return (
    <>
      <NextSeo {...seo} />
      <RemoteMdxLoader source={source} pageHeaderType="collection" />
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
    '/src/pages/data-visualization/axes-and-labels/index.mdx'
  )

  return {
    props: {
      source: mdxSource
    }
  }
}

export default RemoteMdxPage
