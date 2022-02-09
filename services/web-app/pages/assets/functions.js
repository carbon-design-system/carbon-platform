/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CodeSyntax } from '@carbon/pictograms-react'
import { NextSeo } from 'next-seo'
import PropTypes from 'prop-types'
import { useContext, useEffect } from 'react'
import { libraryPropTypes } from 'types'

import Catalog from '@/components/catalog'
import PageHeader from '@/components/page-header'
import { assetsNavData } from '@/data/nav-data'
import { LayoutContext } from '@/layouts/layout'
import { getAllLibraries } from '@/lib/github'

const Functions = ({ librariesData }) => {
  const { setNavData } = useContext(LayoutContext)

  const seo = {
    title: 'Functions'
  }

  useEffect(() => {
    setNavData(assetsNavData)
  }, [setNavData])

  return (
    <>
      <NextSeo {...seo} />
      <PageHeader title={seo.title} pictogram={CodeSyntax} />
      <Catalog data={librariesData} type="function" />
    </>
  )
}

Functions.propTypes = {
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

export default Functions
