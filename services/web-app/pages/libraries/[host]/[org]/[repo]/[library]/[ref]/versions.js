/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { useContext, useEffect } from 'react'

import PageHeader from '@/components/page-header'
import { librariesNavData } from '@/data/nav-data'
import { LayoutContext } from '@/layouts/layout'
import { getLibraryData, getLibraryNavData } from '@/lib/github'

import styles from '../../../../../../pages.module.scss'

const Versions = ({ libraryData, params, navData }) => {
  const { setPrimaryNavData, setSecondaryNavData } = useContext(LayoutContext)

  const seo = {
    title: 'Versions'
  }

  useEffect(() => {
    setPrimaryNavData(librariesNavData)
    setSecondaryNavData(navData)
  }, [navData, setPrimaryNavData, setSecondaryNavData])

  const releases = libraryData?.content?.releases ?? []

  const versions = releases.filter((r) => !r.draft && !r.prerelease)

  return (
    <>
      <NextSeo {...seo} />
      <Grid>
        <Column sm={4} md={8} lg={12}>
          <PageHeader title={seo.title} />
        </Column>
        <Column sm={4} md={8} lg={12}>
          <div className={styles.content}>
            <ul className={styles.bullets}>
              <li style={{ fontWeight: '700' }}>Version, Date, Changelog, Documentation</li>
              <li>
                Latest, -, -,{' '}
                <Link href={`/libraries/${params.library}`}>
                  <a>View docs</a>
                </Link>
              </li>
              {versions.map((v, i) => (
                <li key={i}>
                  <span>{v.tag_name}, </span>
                  <span>{v.published_at}, </span>
                  <Link href={v.html_url}>
                    <a>View GitHub</a>
                  </Link>
                  ,{' '}
                  <Link href={`/libraries/${params.library}/${v.tag_name}`}>
                    <a>View docs</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Column>
      </Grid>
    </>
  )
}

export const getServerSideProps = async ({ params }) => {
  const libraryData = await getLibraryData(params)

  if (!libraryData) {
    return {
      notFound: true
    }
  }

  const navData = getLibraryNavData(params, libraryData)

  return {
    props: {
      libraryData,
      navData,
      params
    }
  }
}

export default Versions
