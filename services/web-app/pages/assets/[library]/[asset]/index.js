/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getAllAssetPaths, getAssetData } from '@/lib/github'
import { useContext, useEffect } from 'react'

import Image from 'next/image'
import { LayoutContext } from '@/layouts/layout'
import { NextSeo } from 'next-seo'
import { assetsNavData } from '@/data/nav-data'
import { generateBlurImage } from '@/lib/image'
import { getImgSrc } from '@/utils/image'
import styles from '@/pages/pages.module.scss'

const Asset = ({ assetData }) => {
  const { setNavData } = useContext(LayoutContext)

  const { name, description, thumbnailData: imageData } = assetData.asset.contents

  const seo = {
    title: name,
    description
  }

  useEffect(() => {
    setNavData(assetsNavData)
  }, [setNavData])

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
      <pre className={styles.data}>{JSON.stringify(assetData, null, 2)}</pre>
    </>
  )
}

export const getStaticProps = async ({ params }) => {
  const assetData = await getAssetData(params)

  if (!assetData) {
    return {
      notFound: true
    }
  }

  // TODO move this logic to recursive function that finds images in content, and creates image data objects
  if (assetData.asset && assetData.asset.contents && assetData.asset.contents.thumbnail) {
    assetData.asset.contents.thumbnailData = await generateBlurImage(
      getImgSrc(assetData.asset.repository, assetData.asset.contents.thumbnail)
    )
  }

  return {
    props: {
      assetData,
      params
    }
  }
}

// TODO update to Incremental Static Regeneration
export const getStaticPaths = async () => {
  const paths = await getAllAssetPaths()

  return {
    paths,
    fallback: false
  }
}

export default Asset
