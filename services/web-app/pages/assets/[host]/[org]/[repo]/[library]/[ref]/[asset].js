/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Image from 'next/image'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { useContext, useEffect } from 'react'

import { assetsNavData } from '@/data/nav-data'
import { LayoutContext } from '@/layouts/layout'
import { getLibraryData } from '@/lib/github'
import styles from '@/pages/pages.module.scss'

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
  const { name, description, thumbnailData: imageData } = assetData.content

  const seo = {
    title: name,
    description
  }

  return (
    <>
      <NextSeo {...seo} />
      {imageData && (
        <Image
          alt={`${name} thumbnail`}
          height="300px"
          width="400px"
          src={imageData.img.src}
          placeholder={imageData.img.type === 'svg' ? 'empty' : 'blur'}
          blurDataURL={imageData.base64}
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
