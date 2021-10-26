/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useContext, useEffect } from 'react'

import ComponentCatalogIndexPage from '@/components/my-component/index'
import { LayoutContext } from '@/layouts/layout'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { assetsNavData } from '@/data/nav-data'
import { getAllLibrariesAssets } from '@/lib/github'
import slugify from 'slugify'
import styles from '@/pages/pages.module.scss'

const Components = ({ librariesData }) => {
  const { setNavData } = useContext(LayoutContext)

  const assetsData = librariesData.filter((library) => {
    if (!library.assets.length) {
      return false
    }

    const filteredAssets = library.assets.filter((asset) => {
      return asset.contents.type === 'component'
    })

    if (!filteredAssets.length) {
      return false
    }

    return {
      ...library,
      assets: filteredAssets
    }
  })

  const seo = {
    title: 'Components'
  }

  useEffect(() => {
    setNavData(assetsNavData)
  }, [setNavData])

  return (
    <>
      <NextSeo {...seo} />
      <ComponentCatalogIndexPage />
      <ul>
        {assetsData.map((library, i) => {
          return library.assets.map((asset, j) => (
            <li key={`${i}-${j}`}>
              <Link
                href={`/assets/${slugify(library.contents.name, {
                  lower: true
                })}/${slugify(asset.contents.name, {
                  lower: true
                })}`}
              >
                <a>{asset.contents.name}</a>
              </Link>
            </li>
          ))
        })}
      </ul>
      <pre className={styles.data}>{JSON.stringify(assetsData, null, 2)}</pre>
    </>
  )
}

export const getStaticProps = async () => {
  const librariesData = await getAllLibrariesAssets()

  if (!librariesData) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      librariesData
    }
  }
}

export default Components
