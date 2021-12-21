/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Link from 'next/link'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { useContext, useEffect } from 'react'

import { assetsNavData } from '@/data/nav-data'
import { LayoutContext } from '@/layouts/layout'
import { getLibraryData } from '@/lib/github'
import styles from '@/pages/pages.module.scss'
import { assetSortComparator } from '@/utils/schema'
import { getSlug } from '@/utils/slug'

const Library = ({ libraryData, params }) => {
  const { setNavData } = useContext(LayoutContext)
  const router = useRouter()

  useEffect(() => {
    setNavData(assetsNavData)
  }, [setNavData])

  if (router.isFallback) {
    return <h1>Loading...</h1>
  }

  const { name, description } = libraryData.content

  const seo = {
    title: name,
    description
  }

  const assets = libraryData.assets.sort(assetSortComparator)

  return (
    <div>
      <NextSeo {...seo} />
      <ul>
        {assets.map((asset, i) => (
          <li key={i}>
            <Link href={`/assets/${asset.params.library}/${params.ref}/${getSlug(asset.content)}`}>
              <a>{asset.content.name}</a>
            </Link>
          </li>
        ))}
      </ul>
      <pre className={styles.data}>{JSON.stringify(libraryData, null, 2)}</pre>
    </div>
  )
}

export const getStaticProps = async ({ params }) => {
  const libraryData = await getLibraryData(params)

  if (!libraryData) {
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

export default Library
