/*
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { MDXRemote } from 'next-mdx-remote'

import MdxPage from '@/components/mdx-page/mdx-page'
import { getRemoteMdxSource } from '@/lib/github'
import { processMdxSource } from '@/utils/mdx'

const RemoteMdxTest = ({ compiledSource, tabs, mdxError, warnings }) => {
  const frontmatter = compiledSource?.data?.matter || {}
  const { title, description, keywords, pageHeaderType } = frontmatter

  return (
    <MdxPage
      title={title}
      description={description}
      keywords={keywords}
      tabs={tabs}
      mdxError={mdxError}
      warnings={warnings}
      pageHeaderType={pageHeaderType}
    >
      {compiledSource && <MDXRemote compiledSource={compiledSource.value} />}
    </MdxPage>
  )
}

export const getStaticProps = async () => {
  let mdxSource
  let url

  try {
    const response = await getRemoteMdxSource(
      {
        host: 'github.com',
        org: 'francinelucca',
        repo: 'mdx-testing',
        library: 'carbon-website',
        ref: 'main'
      },
      'too-many-errors.mdx'
    )
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
  const tabs = safeSource?.compiledSource?.data?.matter?.tabs || []

  return {
    props: {
      ...safeSource,
      tabs
    }
  }
}

export default RemoteMdxTest
