/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { NextSeo } from 'next-seo'
import PropTypes from 'prop-types'
import { useContext, useEffect } from 'react'

import AssetsCatalog from '@/components/assets-catalog'
import PageHeader from '@/components/page-header'
import { assetTypes } from '@/data/asset-types'
import { assetsNavData } from '@/data/nav-data'
import { LayoutContext } from '@/layouts/layout'
import { getAllLibraries } from '@/lib/github'
import { libraryPropTypes } from '@/types'

const Patterns = ({ librariesData }) => {
  const { setPrimaryNavData } = useContext(LayoutContext)

  const { pattern } = assetTypes

  const seo = {
    title: 'Patterns'
  }

  useEffect(() => {
    setPrimaryNavData(assetsNavData)
  }, [setPrimaryNavData])

  return (
    <>
      <NextSeo {...seo} />
      <PageHeader bgColor={pattern.bgColor} title={seo.title} pictogram={pattern.icon} />
      {/* this probably eventually gets replaced  by a parentsCatalog */}
      <AssetsCatalog libraries={librariesData.libraries} type="pattern" />
    </>
  )
}

Patterns.propTypes = {
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

export default Patterns
