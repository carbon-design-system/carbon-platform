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

const Libraries = ({ librariesData }) => {
  const { setNavData } = useContext(LayoutContext)

  const seo = {
    title: 'Libraries'
  }

  useEffect(() => {
    setNavData(assetsNavData)
  }, [setNavData])

  return (
    <>
      <NextSeo {...seo} />
      <ul>
        {librariesData.map((library, i) => (
          <li key={i}>
            <Link
              href={`/assets/${slugify(library.contents.name, {
                lower: true
              })}`}
            >
              <a>{library.contents.name}</a>
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

export default Libraries
