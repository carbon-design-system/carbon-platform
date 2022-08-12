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
import { assetsNavData } from '@/data/nav-data'
import { LayoutContext } from '@/layouts/layout/layout'
import {
  getAllLibraries,
  getLibraryData,
  getLibraryNavData,
  getRemoteMdxSource
} from '@/lib/github'
import { processMdxSource } from '@/utils/mdx'
import { isValidHttpUrl } from '@/utils/string'
import { dfs } from '@/utils/tree'

const LibraryPage = ({
  compiledSource,
  tabs,
  mdxError,
  warnings,
  navData,
  navTitle,
  libraryData
}) => {
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
        tabs={tabs}
        mdxError={mdxError}
        warnings={warnings}
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

  let { host, org, repo, ref } = params

  if (isValidHttpUrl(pageSrc)) {
    const url = new URL(pageSrc)
    host = url.host
    const pathNameChunks = url.pathname.split('/')
    org = pathNameChunks[1]
    repo = pathNameChunks[2]
    ref = pathNameChunks[4]
    pageSrc = pathNameChunks.slice(5, pathNameChunks.length).join('/')
  } else {
    pageSrc = path.join('.' + libraryData.params.path, pageSrc)
  }

  let mdxSource
  let pageUrl
  let safeSource = {}
  let tabs

  try {
    const response = await getRemoteMdxSource(
      {
        host,
        org,
        repo,
        ref
      },
      pageSrc
    )
    mdxSource = response.mdxSource
    pageUrl = response.url
    safeSource = await processMdxSource(mdxSource, pageUrl)
    // TODO: query GH for the actual tabs and have one supersede the other
    tabs = safeSource?.compiledSource?.data?.matter?.tabs || []
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
      navTitle,
      tabs
    }
  }
}

export const getStaticPaths = async () => {
  const librariesData = await getAllLibraries()

  const pages = []

  librariesData.libraries.forEach((library) => {
    if (library.content.navData) {
      // traverse items subtree and remove hidden nodes
      dfs(library.content.navData, (item) => {
        const itemSlug = slugify(item.title, { strict: true, lower: true })
        const itemPath = item.parentPath ? `${item.parentPath}/${itemSlug}` : itemSlug
        if (item.items) {
          item.items = item.items?.filter((childItem) => !childItem.hidden)
          item.items.forEach((child) => {
            child.parentPath = itemPath
          })
        }
        if (item.path) {
          pages.push({
            params: { ...library.params, page: itemPath.split('/') }
          })
          // hard coding latest temporarily, in the future we want to do ISR here
          pages.push({ params: { ...library.params, page: itemPath.split('/'), ref: 'latest' } })
        }
      })
    }
  })

  return {
    paths: pages,
    // returning 404 if page wasn't generated at build time
    // to prevent remote mdx dynamic loading for now
    fallback: false
  }
}

export default LibraryPage
