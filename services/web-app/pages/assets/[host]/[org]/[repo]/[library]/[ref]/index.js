/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Download_02 as Download } from '@carbon/pictograms-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { useContext, useEffect } from 'react'

import PageBreadcrumb from '@/components/page-breadcrumb'
import PageHeader from '@/components/page-header'
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
    return (
      <div className={styles.content}>
        <h1>Loading...</h1>
      </div>
    )
  }

  const { name, description } = libraryData.content

  const breadcrumbItems = [
    {
      name: 'Libraries',
      path: '/assets/libraries'
    },
    {
      name
    }
  ]

  const seo = {
    title: name,
    description
  }

  const assets = libraryData.assets.sort(assetSortComparator)

  return (
    <>
      <PageHeader title={seo.title} pictogram={Download} />
      <PageBreadcrumb items={breadcrumbItems} />
      <div className={styles.content}>
        <NextSeo {...seo} />
        <ul>
          {assets.map((asset, i) => (
            <li key={i}>
              <Link
                href={`/assets/${asset.params.library}/${params.ref}/${getSlug(asset.content)}`}
              >
                <a>{asset.content.name}</a>
              </Link>
            </li>
          ))}
        </ul>
        <pre className={styles.data}>{JSON.stringify(libraryData, null, 2)}</pre>
      </div>
    </>
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
    revalidate: 60
  }
}

export const getStaticPaths = async () => {
  return {
    // For now, SSG one path to get ISR to get recognized in Netlify. For some reason, Netlify
    // throws 404 errors if the `paths` is an empty array so all pages are ISR.
    paths: [
      {
        params: {
          host: 'github.ibm.com',
          org: 'matt-rosno',
          repo: 'carbon-charts',
          library: 'carbon-charts',
          ref: 'master'
        }
      }
    ],
    fallback: true
  }
}

export default Library
