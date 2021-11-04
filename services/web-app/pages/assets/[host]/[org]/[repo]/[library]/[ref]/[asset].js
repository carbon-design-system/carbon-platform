/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useContext, useEffect } from 'react'

import { IMAGES_CACHE_PATH } from '@/config/constants'
import Image from 'next/image'
import { LayoutContext } from '@/layouts/layout'
import { NextSeo } from 'next-seo'
import { assetsNavData } from '@/data/nav-data'
import { generateBlurImage } from '@/lib/image'
import { getLibraryData } from '@/lib/github'
import styles from '@/pages/pages.module.scss'
import { useRouter } from 'next/router'

const Asset = ({ libraryData }) => {
  const { setNavData } = useContext(LayoutContext)
  const router = useRouter()

  useEffect(() => {
    setNavData(assetsNavData)
  }, [setNavData])

  if (router.isFallback) {
    return <h1>Loading...</h1>
  }

  const [assetData] = libraryData.assets
  const { name, description, thumbnailData } = assetData.content

  const seo = {
    title: name,
    description
  }

  return (
    <>
      <NextSeo {...seo} />
      {thumbnailData && (
        <Image
          alt={`${name} thumbnail`}
          height="300px"
          width="400px"
          src={thumbnailData.img.src}
          placeholder="blur"
          blurDataURL={thumbnailData.base64}
        />
      )}
      <pre className={styles.data}>{JSON.stringify(libraryData, null, 2)}</pre>
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

  const asset = libraryData.assets[0]

  if (asset.content.thumbnailPath) {
    const path = `/${IMAGES_CACHE_PATH}/${asset.params.host}/${asset.params.org}/${
      asset.params.repo
    }/${asset.params.ref}/${asset.response.path.replace('/carbon-asset.yml', '')}${
      asset.content.thumbnailPath
    }`

    const { img, base64 } = await generateBlurImage(path)

    asset.content.thumbnailData = { img, base64 }
  }

  return {
    props: {
      libraryData,
      params
    },
    revalidate: 10
  }
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true
  }
}

export default Asset
