/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { capitalCase } from 'change-case'
import { NextSeo } from 'next-seo'
import { useContext, useEffect } from 'react'

import RemoteMdxLoader from '@/components/remote-mdx-loader'
import { assetsNavData } from '@/data/nav-data'
import { LayoutContext } from '@/layouts/layout/layout'
import { getAllLibraries, getLibraryData, getRemoteMdxData } from '@/lib/github'
// import { getAssetType } from '@/utils/schema'
import { getSlug } from '@/utils/slug'
import { isValidHttpUrl } from '@/utils/string'

const AssetTabPage = ({ source, assetData, params }) => {
  const seo = {
    title: `${assetData?.content?.name} - ${capitalCase(params?.tab ?? '')}`
  }

  const { setPrimaryNavData } = useContext(LayoutContext)

  //   const breadcrumbItems = [
  //     {
  //       name: getAssetType(assetData).namePlural,
  //       path: getAssetType(assetData).path
  //     },
  //     {
  //       name
  //     }
  //   ]

  useEffect(() => {
    setPrimaryNavData(assetsNavData)
  }, [setPrimaryNavData])

  return (
    <>
      <NextSeo {...seo} />
      <RemoteMdxLoader source={source} />
    </>
  )
}

export const getStaticProps = async ({ params }) => {
  const libraryData = await getLibraryData(params)

  if (!libraryData || !libraryData.assets || !libraryData.assets.length) {
    return {
      notFound: true
    }
  }

  const [assetData] = libraryData.assets

  let src = ''

  let { host, org, repo, ref, tab } = params

  switch (tab) {
    case 'accessibility':
      src = assetData.content.docs.accessibilityPath
      break
    case 'usage':
      src = assetData.content.docs.usagePath
      break
    case 'style':
      src = assetData.content.docs.stylePath
      break
    case 'code':
      src = assetData.content.docs.codePath
      break
  }

  if (isValidHttpUrl(src)) {
    const url = new URL(src)
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
      assetData,
      params,
      source: mdxSource
    }
  }
}

export const getStaticPaths = async () => {
  const librariesData = await getAllLibraries()

  const pages = []

  librariesData.libraries.forEach((library) => {
    if (library.assets && library.assets.length) {
      library.assets.forEach((asset) => {
        if (asset.content.docs?.accessibilityPath) {
          pages.push({
            params: { ...library.params, asset: getSlug(asset.content), tab: 'accessibility' }
          })
        }
        if (asset.content.docs?.codePath) {
          pages.push({
            params: { ...library.params, asset: getSlug(asset.content), tab: 'code' }
          })
        }
        if (asset.content.docs?.stylePath) {
          pages.push({
            params: { ...library.params, asset: getSlug(asset.content), tab: 'style' }
          })
        }
        if (asset.content.docs?.usagePath) {
          pages.push({
            params: { ...library.params, asset: getSlug(asset.content), tab: 'usage' }
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

export default AssetTabPage
