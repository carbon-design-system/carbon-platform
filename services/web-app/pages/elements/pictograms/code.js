/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { NextSeo } from 'next-seo'

import RemoteMdxLoader from '@/components/remote-mdx-loader'
import { getRemoteMdxPageStaticProps } from '@/utils/mdx'

const RemoteMdxPage = ({ source, mdxError }) => {
  const seo = {
    title: 'Code'
  }

  return (
    <>
      <NextSeo {...seo} />
      <RemoteMdxLoader source={source} mdxError={mdxError} />
    </>
  )
}

export const getStaticProps = async () => {
  return getRemoteMdxPageStaticProps(
    {
      host: 'github.com',
      org: 'carbon-design-system',
      repo: 'carbon-website',
      library: 'carbon-website',
      ref: 'main'
    },
    '/src/pages/guidelines/pictograms/code.mdx'
  )
}

export default RemoteMdxPage
