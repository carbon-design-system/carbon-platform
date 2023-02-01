/*
 * Copyright IBM Corp. 2022, 2023
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
import useMetaTitle from '@/utils/use-meta-title'

const Templates = ({ librariesData }) => {
  const { setPrimaryNavData } = useContext(LayoutContext)
  const metaTitle = useMetaTitle()

  const { template } = assetTypes

  const seo = {
    title: metaTitle
  }

  useEffect(() => {
    setPrimaryNavData(assetsNavData)
  }, [setPrimaryNavData])

  return (
    <>
      <NextSeo {...seo} />
      <PageHeader bgColor={template.bgColor} title="Templates" pictogram={template.icon} />
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
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every hour
    revalidate: 60 * 60 // In seconds
  }
}

export default Templates
