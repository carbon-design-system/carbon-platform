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

import Catalog from '@/components/catalog'
import PageHeader from '@/components/page-header'
import { homeNavData } from '@/data/nav-data'
import { type } from '@/data/type'
import { LayoutContext } from '@/layouts/layout'
import { getAllLibraries } from '@/lib/github'

const Elements = ({ librariesData }) => {
  const { setPrimaryNavData, setSecondaryNavData } = useContext(LayoutContext)

  const { element } = type

  const seo = {
    title: 'Elements'
  }

  useEffect(() => {
    setPrimaryNavData(homeNavData)
    setSecondaryNavData()
  }, [setPrimaryNavData, setSecondaryNavData])

  return (
    <>
      <NextSeo {...seo} />
      <PageHeader bgColor={element.bgColor} title={seo.title} pictogram={element.icon} />
      <Catalog data={librariesData} type="element" />
    </>
  )
}

Elements.propTypes = {
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

export default Elements
