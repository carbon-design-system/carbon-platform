/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { TextInput } from '@carbon/pictograms-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { useContext, useEffect } from 'react'

import PageHeader from '@/components/page-header/page-header'
import { assetsNavData } from '@/data/nav-data'
import { LayoutContext } from '@/layouts/layout'
import { getLibraryData } from '@/lib/github'
import styles from '@/pages/pages.module.scss'
import { getSlug } from '@/utils/slug'

const InheritsLink = ({ data }) => {
  if (!data || !data.asset) return null

  const [libraryId] = data.asset.split('@')
  const libraryRef = data.asset.slice(data.asset.indexOf('@') + 1, data.asset.lastIndexOf('/'))
  const [assetId] = data.asset.split('/').reverse()

  return (
    <div>
      Inherits{' '}
      <Link href={`/assets/${libraryId}/${libraryRef || 'latest'}/${assetId}`}>
        <a>{data.asset}</a>
      </Link>
    </div>
  )
}

const Asset = ({ libraryData }) => {
  const { setNavData } = useContext(LayoutContext)
  const router = useRouter()

  useEffect(() => {
    setNavData(assetsNavData)
  }, [setNavData])

  if (router.isFallback) {
    return (
      <div className={styles.content}>
        <h1>Loading...</h1>
      </div>
    )
  }

  const [assetData] = libraryData.assets
  const { name, description, inherits: inheritsData, thumbnailData: imageData } = assetData.content

  const id = getSlug(libraryData.content)

  const libraryId = id
    .replace(/\b(([a-zÁ-ú]){3,})/g, (w) => w.charAt(0).toUpperCase() + w.slice(1))
    .replace(/-/g, ' ')

  const seo = {
    title: name,
    description
  }

  return (
    <>
      <PageHeader title={seo.title} pictogram={TextInput} contentId={id} libraryId={libraryId} />
      <div className={styles.content}>
        <NextSeo {...seo} />
        {inheritsData && <InheritsLink data={inheritsData} />}
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
      </div>
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
