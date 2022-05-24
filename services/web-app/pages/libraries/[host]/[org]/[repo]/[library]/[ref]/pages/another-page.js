/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'
import { NextSeo } from 'next-seo'
import { useContext, useEffect } from 'react'

import { librariesNavData } from '@/data/nav-data'
import { LayoutContext } from '@/layouts/layout'
import { getLibraryData, getLibraryNavData } from '@/lib/github'

import styles from '../../../../../../../pages.module.scss'

const AnotherPage = ({ libraryData, navData }) => {
  const { setPrimaryNavData, setSecondaryNavData } = useContext(LayoutContext)

  const seo = {
    title: 'Another page'
  }

  useEffect(() => {
    setPrimaryNavData(librariesNavData)
    setSecondaryNavData(navData)
  }, [navData, setPrimaryNavData, setSecondaryNavData])

  return (
    <>
      <NextSeo {...seo} />
      <Grid>
        <Column sm={4} md={8} lg={12}>
          <div className={styles.content}>
            Another page for {libraryData?.content?.name} coming soon...
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

export default AnotherPage
