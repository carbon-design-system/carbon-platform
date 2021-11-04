/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useContext, useEffect } from 'react'

import { LayoutContext } from '@/layouts/layout'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { assetsNavData } from '@/data/nav-data'
import { getAllLibraries } from '@/lib/github'
import slugify from 'slugify'
import styles from '@/pages/pages.module.scss'

const Patterns = ({ librariesData }) => {
  const { setNavData } = useContext(LayoutContext)

  const seo = {
    title: 'Patterns'
  }

  useEffect(() => {
    setNavData(assetsNavData)
  }, [setNavData])

  const libraries = librariesData.libraries
    .filter((library) => library.assets.length)
    .sort((a, b) =>
      a.content.name > b.content.name ? 1 : b.content.name > a.content.name ? -1 : 0
    )

  const assets = libraries
    .reduce((assets, library) => {
      return assets.concat(library.assets)
    }, [])
    .filter((asset) => asset.content.type === 'pattern')
    .sort((a, b) =>
      a.content.name > b.content.name ? 1 : b.content.name > a.content.name ? -1 : 0
    )

  return (
    <>
      <NextSeo {...seo} />
      <ul>
        {assets.map((asset, i) => (
          <li key={i}>
            <Link
              href={`/assets/${asset.params.slug}/latest/${slugify(asset.content.name, {
                lower: true
              })}`}
            >
              <a>{asset.content.name}</a>
            </Link>
          </li>
        ))}
      </ul>
      <pre className={styles.data}>{JSON.stringify(librariesData, null, 2)}</pre>
    </>
  )
}

export const getStaticProps = async () => {
  const librariesData = await getAllLibraries()

  return {
    props: {
      librariesData
    }
  }
}

export default Patterns
