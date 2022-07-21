/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { NextSeo } from 'next-seo'

import RemoteMdxLoader from '@/components/remote-mdx-loader'
import { getRemoteMdxSource } from '@/lib/github'
import { parseMdxResponseContent } from '@/utils/mdx'

const RemoteMdxPage = ({ source }) => {
  const seo = {
    title: 'Patterns'
  }

  return (
    <>
      <NextSeo {...seo} />
      <RemoteMdxLoader source={source} />
    </>
  )
}

export const getStaticProps = async () => {
  const mdxSource = await parseMdxResponseContent(
    await getRemoteMdxSource(
      {
        host: 'github.com',
        org: 'carbon-design-system',
        repo: 'carbon-website',
        library: 'carbon-website',
        ref: 'main'
      },
      '/src/pages/contributing/pattern.mdx'
    )
  )

  return {
    props: {
      source: mdxSource
    }
  }
}

export default RemoteMdxPage
