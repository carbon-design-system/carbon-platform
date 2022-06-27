/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { NextSeo } from 'next-seo'
import { useContext, useEffect } from 'react'
import slugify from 'slugify'

import RemoteMdxLoader from '@/components/remote-mdx-loader'
import { assetsNavData } from '@/data/nav-data'
import { LayoutContext } from '@/layouts/layout/layout'
import { getAllLibraries, getLibraryData, getLibraryNavData, getRemoteMdxData } from '@/lib/github'
import { isValidHttpUrl } from '@/utils/string'
import { dfs } from '@/utils/tree'

const RemoteMdxPage = ({ source, navData, navTitle, libraryData }) => {
  const seo = {
    title: `${libraryData?.content?.name ?? ''} - ${navTitle}`
  }

  const { setPrimaryNavData, setSecondaryNavData } = useContext(LayoutContext)

  useEffect(() => {
    setPrimaryNavData(assetsNavData)
    setSecondaryNavData(navData)
  }, [setPrimaryNavData, navData, setSecondaryNavData])

  return (
    <>
      <NextSeo {...seo} />
      <RemoteMdxLoader source={source} />
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

  dfs(libraryData.content.navData, (item) => {
    if (slugify(item.title, { strict: true, lower: true }) === params.page) {
      pageSrc = item.src
      navTitle = item.title
      return true
    }
  })

  let { host, org, repo, ref, src } = params

  if (isValidHttpUrl(pageSrc)) {
    const url = new URL(pageSrc)
    host = url.host
    const pathNameChunks = url.pathname.split('/')
    org = pathNameChunks[1]
    repo = pathNameChunks[2]
    ref = pathNameChunks[4]
    src = pathNameChunks.slice(5, pathNameChunks.length).join('/')
  }

  const mdxSource = await getRemoteMdxData(
    {
      host,
      org,
      repo,
      ref
    },
    src
  )

  return {
    props: {
      libraryData,
      navData,
      params,
      source: mdxSource,
      navTitle
    }
  }
}

export const getStaticPaths = async () => {
  const librariesData = await getAllLibraries()

  const pages = []

  librariesData.libraries.forEach((library) => {
    if (library.content.navData) {
      dfs(library.content.navData, (item) => {
        if (item.path) {
          pages.push({
            params: { ...library.params, page: slugify(item.title, { strict: true, lower: true }) }
          })
        }
      })
    }
  })

  return {
    paths: pages, // indicates that no page needs be created at build time
    fallback: true // indicates the type of fallback
  }
}

export default RemoteMdxPage
