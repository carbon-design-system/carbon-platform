/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { MDXRemote } from 'next-mdx-remote'

import MdxPage from '@/components/mdx-page'
import { newGetRemoteMdxSource } from '@/lib/github'
import { processMdxSource } from '@/utils/mdx'

const RemoteMdxPage = ({ compiledSource, tabs, mdxError, warnings }) => {
  const frontmatter = compiledSource?.data?.matter || {}
  const { title, description, keywords } = frontmatter

  return (
    <MdxPage
      title={title}
      description={description}
      keywords={keywords}
      tabs={tabs}
      mdxError={mdxError}
      warnings={warnings}
    >
      {compiledSource && <MDXRemote compiledSource={compiledSource.value} />}
    </MdxPage>
  )
}

export const getStaticProps = async () => {
  const repoParams = {
    host: 'github.com',
    org: 'carbon-design-system',
    repo: 'carbon-website',
    library: 'carbon-website',
    ref: 'main'
  }
  const filePath = '/src/pages/case-studies/consistency-in-the-cloud.mdx'

  let mdxSource
  let url

  try {
    const response = await newGetRemoteMdxSource(repoParams, filePath)
    mdxSource = response.mdxSource
    url = response.url
  } catch (err) {
    return {
      props: {
        mdxError: {
          name: err.name,
          message: err.message,
          stack: err.stack
        }
      }
    }
  }

  const safeSource = await processMdxSource(mdxSource, url)

  // TODO: query GH for the actual tabs and have one supersede the other
  const tabs = safeSource?.data?.matter?.tabs || []

  return {
    props: {
      ...safeSource,
      tabs
    }
  }
}

export default RemoteMdxPage
