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
import { assetsNavData } from '@/data/nav-data'
import { type } from '@/data/type'
import { LayoutContext } from '@/layouts/layout'
import { getAllLibraries } from '@/lib/github'

const DataVisualization = ({ librariesData }) => {
  const { setPrimaryNavData } = useContext(LayoutContext)

  const { collection } = type

  const seo = {
    title: 'Data Visualization'
  }

  useEffect(() => {
    setPrimaryNavData(assetsNavData)
  }, [setPrimaryNavData])

  return (
    <>
      <NextSeo {...seo} />
      <PageHeader bgColor={collection.bgColor} title={seo.title} pictogram={collection.icon} />
      <AssetsCatalog
        collection="data-visualization"
        libraries={librariesData.libraries}
        glob={{ data: 'params.library', pattern: 'carbon-charts*' }}
      />
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

export default DataVisualization
