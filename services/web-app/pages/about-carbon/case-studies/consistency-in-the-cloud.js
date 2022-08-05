/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { MdxProcessor } from '@carbon-platform/mdx-processor'
import { mdxSanitizerPlugin } from '@carbon-platform/mdx-sanitizer'
import { NextSeo } from 'next-seo'
import { VFile } from 'vfile'

import RemoteMdxLoader from '@/components/remote-mdx-loader'
import { getRemoteMdxSource } from '@/lib/github'

const RemoteMdxPage = ({ compiledSource, mdxError }) => {
  const seo = {
    title: 'Consistency in the Cloud'
  }

  return (
    <>
      <NextSeo {...seo} />
      {/* <div id="need-to-make-unique-id" dangerouslySetInnerHTML={{ __html: html }} /> */}
      <RemoteMdxLoader compiledSource={compiledSource} mdxError={mdxError} />
    </>
  )
}

export const getStaticProps = async () => {
  const filePath = '/src/pages/case-studies/consistency-in-the-cloud.mdx'

  const response = await getRemoteMdxSource(
    {
      host: 'github.com',
      org: 'carbon-design-system',
      repo: 'carbon-website',
      library: 'carbon-website',
      ref: 'main'
    },
    '/src/pages/case-studies/consistency-in-the-cloud.mdx'
  )

  const mdxSource = Buffer.from(response.content, response.encoding).toString()

  const f = new VFile({ value: mdxSource, path: filePath })
  const processor = new MdxProcessor({ sanitizerPlugin: mdxSanitizerPlugin, components: [] })
  const compiledSource = await processor.process(f)

  return {
    props: {
      compiledSource
    }
  }
}

export default RemoteMdxPage
