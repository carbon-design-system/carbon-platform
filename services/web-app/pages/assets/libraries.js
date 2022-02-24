/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { FileBackup } from '@carbon/pictograms-react'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import PropTypes from 'prop-types'
import { useContext, useEffect } from 'react'
import { libraryPropTypes } from 'types'

import PageHeader from '@/components/page-header'
import { assetsNavData } from '@/data/nav-data'
import { LayoutContext } from '@/layouts/layout'
import { getAllLibraries } from '@/lib/github'
import { librarySortComparator } from '@/utils/schema'

const Libraries = ({ librariesData }) => {
  const { setNavData } = useContext(LayoutContext)

  const seo = {
    title: 'Libraries'
  }

  useEffect(() => {
    setNavData(assetsNavData)
  }, [setNavData])

  const libraries = librariesData.libraries
    .filter((library) => !library.content.noIndex)
    .sort(librarySortComparator)

  return (
    <>
      <NextSeo {...seo} />
      <PageHeader title={seo.title} pictogram={FileBackup} />
      <ul>
        {libraries.map((library, i) => (
          <li key={i}>
            <Link href={`/assets/${library.params.library}`}>
              <a>{library.content.name}</a>
            </Link>
            <ul>
              <li>{library.content.id}</li>
              <li>{library.content.description}</li>
            </ul>
          </li>
        ))}
      </ul>
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
