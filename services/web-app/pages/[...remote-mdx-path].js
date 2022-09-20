/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useRouter } from 'next/router'
import { MDXRemote } from 'next-mdx-remote'

import MdxPage from '@/components/mdx-page/mdx-page'
import PageHeader from '@/components/page-header'
import PageLoading from '@/components/page-loading'
import { defaultFilePathPrefix, defaultParams, remotePages } from '@/data/remote-pages'
import { getRemoteMdxSource } from '@/lib/github'
import { processMdxSource } from '@/utils/mdx'

const RemoteMdxPage = ({ compiledSource, tabs, mdxError, warnings, pageHeaderType }) => {
  const router = useRouter()

  if (router.isFallback) {
    return (
      <>
        <PageHeader loading />
        <PageLoading />
      </>
    )
  }

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
      pageHeaderType={pageHeaderType}
    >
      {compiledSource && <MDXRemote compiledSource={compiledSource.value} />}
    </MdxPage>
  )
}

export const getStaticProps = async ({ params }) => {
  const pageRoute = params['remote-mdx-path'].join('/')
  const pageData = remotePages[pageRoute]

  // this page doesn't exist
  if (!pageData) {
    return {
      notFound: true
    }
  }

  let mdxSource
  let url

  const pageParams = pageData.params || defaultParams
  const filePath = pageData.filePath || `${defaultFilePathPrefix}/${pageRoute}.mdx`

  try {
    const response = await getRemoteMdxSource(pageParams, filePath)
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
      },
      // Next.js will attempt to re-generate the page:
      // - When a request comes in
      // - At most once every hour
      revalidate: 60 * 60 // In seconds
    }
  }

  const safeSource = await processMdxSource(mdxSource, url)

  // TODO: query GH for the actual tabs and have one supersede the other
  const tabs = safeSource?.compiledSource?.data?.matter?.tabs || []

  return {
    props: {
      ...safeSource,
      tabs,
      pageHeaderType:
        pageData.pageHeaderType ?? safeSource?.compiledSource?.data?.matter?.pageHeaderType ?? null
    }, // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every hour
    revalidate: 60 * 60 // In seconds
  }
}

export const getStaticPaths = async () => {
  const allowedPaths = Object.keys(remotePages).map((remotePage) => {
    return {
      params: {
        'remote-mdx-path': remotePage.split('/')
      }
    }
  })
  return {
    paths: allowedPaths,
    fallback: true
  }
}

export default RemoteMdxPage
