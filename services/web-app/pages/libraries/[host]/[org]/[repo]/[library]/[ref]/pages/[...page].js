/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { MDXRemote } from 'next-mdx-remote'
import { NextSeo } from 'next-seo'
import path from 'path'
import { useContext, useEffect } from 'react'
import slugify from 'slugify'

import MdxPage from '@/components/mdx-page/mdx-page'
import withLoading from '@/components/with-loading/with-loading'
import { assetsNavData } from '@/data/nav-data'
import { pageHeaders } from '@/data/page-headers'
import { LayoutContext } from '@/layouts/layout/layout'
import { getLibraryData, getLibraryNavData, getRemoteMdxSource } from '@/lib/github'
import { processMdxSource } from '@/utils/mdx'
import { createUrl } from '@/utils/string'
import { dfs } from '@/utils/tree'

const LibraryPage = ({ compiledSource, mdxError, warnings, navData, navTitle, libraryData }) => {
  const seo = {
    title: `${libraryData?.content?.name ?? ''} - ${navTitle}`
  }

  const { setPrimaryNavData, setSecondaryNavData } = useContext(LayoutContext)

  useEffect(() => {
    setPrimaryNavData(assetsNavData)
    setSecondaryNavData(navData)
  }, [setPrimaryNavData, navData, setSecondaryNavData])

  const frontmatter = compiledSource?.data?.matter || {}
  const { title, description, keywords } = frontmatter
  return (
    <>
      <NextSeo {...seo} />
      <MdxPage
        title={title}
        description={description}
        keywords={keywords}
        mdxError={mdxError}
        warnings={warnings}
        pageHeaderType="library"
      >
        {compiledSource && <MDXRemote compiledSource={compiledSource.value} />}
      </MdxPage>
    </>
  )
}

export const getStaticProps = async ({ params }) => {
  const libraryData = await getLibraryData(params)

  if (!libraryData || !libraryData.content.navData) {
    return {
      notFound: true
    }
  }
  const navData = getLibraryNavData(params, libraryData)

  let pageSrc = ''
  let navTitle = ''

  // traverse items subtree and remove hidden nodes
  dfs(libraryData.content.navData, (item) => {
    const itemSlug = slugify(item.title, { strict: true, lower: true })
    const itemPath = item.parentPath ? `${item.parentPath}/${itemSlug}` : itemSlug
    if (item.items) {
      item.items = item.items?.filter((childItem) => !childItem.hidden)
      item.items.forEach((child) => {
        child.parentPath = itemPath
      })
    }
    if (itemPath === params.page.join('/')) {
      pageSrc = item.src
      navTitle = item.title
      return true
    }
  })

  if (!pageSrc) {
    return {
      notFound: true
    }
  }

  if (!createUrl(pageSrc)) {
    pageSrc = path.join('.' + libraryData.params.path, pageSrc)
  }

  let mdxSource
  let safeSource = {}

  try {
    const response = await getRemoteMdxSource(params, pageSrc)
    mdxSource = response.mdxSource
    const pageUrl = response.url
    safeSource = await processMdxSource(mdxSource, pageUrl)
  } catch (err) {
    safeSource.mdxError = {
      name: err.name,
      message: err.message,
      stack: err.stack
    }
  }

  return {
    props: {
      libraryData,
      navData,
      params,
      ...safeSource,
      navTitle
    }, // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every hour
    revalidate: 60 * 60 // In seconds
  }
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true
  }
}

export default withLoading(LibraryPage, {
  pageHeader: { bgColor: pageHeaders?.library?.bgColor }
})
