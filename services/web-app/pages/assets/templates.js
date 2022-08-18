/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { NextSeo } from 'next-seo'
import { useContext, useEffect } from 'react'

import AssetsCatalog from '@/components/assets-catalog'
import PageHeader from '@/components/page-header'
import { assetTypes } from '@/data/asset-types'
import { assetsNavData } from '@/data/nav-data'
import { LayoutContext } from '@/layouts/layout'
import { getAllLibraries } from '@/lib/github'

const Templates = ({ librariesData }) => {
  const { setPrimaryNavData } = useContext(LayoutContext)

  const { template } = assetTypes

  const seo = {
    title: 'Templates'
  }

  useEffect(() => {
    setPrimaryNavData(assetsNavData)
  }, [setPrimaryNavData])

  return (
    <>
      <NextSeo {...seo} />
      <PageHeader bgColor={template.bgColor} title={seo.title} pictogram={template.icon} />
      {/* this probably eventually gets replaced  by a parentsCatalog */}
      <AssetsCatalog libraries={librariesData.libraries} type="template" />
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

export default Templates
