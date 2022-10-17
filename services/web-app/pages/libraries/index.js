/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { PageDescription } from '@carbon-platform/mdx-components'
import { NextSeo } from 'next-seo'
import PropTypes from 'prop-types'
import { useContext, useEffect } from 'react'

import ContentWrapper from '@/components/content-wrapper'
import LibraryCatalog from '@/components/library-catalog/library-catalog'
import PageHeader from '@/components/page-header'
import { assetsNavData } from '@/data/nav-data'
import { pageHeaders } from '@/data/page-headers'
import { LayoutContext } from '@/layouts/layout'
import { getAllLibraries } from '@/lib/github'
import { libraryPropTypes } from '@/types'
import { librarySortComparator } from '@/utils/schema'

import styles from './index.module.scss'

const Libraries = ({ librariesData }) => {
  const { setPrimaryNavData } = useContext(LayoutContext)

  const pageHeader = pageHeaders?.library ?? {}

  const seo = {
    title: 'Libraries'
  }

  useEffect(() => {
    setPrimaryNavData(assetsNavData)
  }, [setPrimaryNavData])

  const libraries = librariesData.libraries
    .filter((library) => !library.content.noIndex)
    .sort(librarySortComparator)

  return (
    <>
      <NextSeo {...seo} />
      <PageHeader bgColor={pageHeader?.bgColor} title={seo.title} pictogram={pageHeader?.icon} />
      <ContentWrapper>
        <PageDescription className={styles['library-description']}>
          Libraries are 1:1 with code packages. All coded components, elements, patterns, or
          functions belong to a library and have a maintainer. Design kits with compatible code also
          live in libraries.
        </PageDescription>
        <LibraryCatalog libraries={libraries} />
      </ContentWrapper>
    </>
  )
}

Libraries.propTypes = {
  librariesData: PropTypes.shape({
    libraries: PropTypes.arrayOf(libraryPropTypes)
  })
}

export const getStaticProps = async () => {
  const librariesData = await getAllLibraries()

  return {
    props: {
      librariesData
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every hour
    revalidate: 60 * 60 // In seconds
  }
}

export default Libraries
