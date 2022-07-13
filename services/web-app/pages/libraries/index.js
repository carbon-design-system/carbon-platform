/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { NextSeo } from 'next-seo'
import PropTypes from 'prop-types'
import { useContext, useEffect } from 'react'
import { libraryPropTypes } from 'types'

import LibraryCatalog from '@/components/library-catalog/library-catalog'
import PageDescription from '@/components/page-description/page-description'
import PageHeader from '@/components/page-header'
import { assetsNavData } from '@/data/nav-data'
import { LayoutContext } from '@/layouts/layout'
import { getAllLibraries } from '@/lib/github'
import { librarySortComparator } from '@/utils/schema'

import styles from './index.module.scss'

const Libraries = ({ librariesData }) => {
  const { setPrimaryNavData } = useContext(LayoutContext)

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
      <PageHeader title={seo.title} />
      <div className={styles['library-description']}>
        <PageDescription>
          Libraries are the reusable building blocks of our design system. Each component meets a
          specific interaction or UI need, and has been specifically created to work together to
          create patterns and intuitive user experiences.
        </PageDescription>
      </div>
      <LibraryCatalog libraries={libraries} />
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
    }
  }
}

export default Libraries
