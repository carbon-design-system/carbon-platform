/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { NextSeo } from 'next-seo'
import { useContext, useEffect } from 'react'

import Catalog from '@/components/catalog'
import PageHeader from '@/components/page-header'
import { homeNavData } from '@/data/nav-data'
import { type } from '@/data/type'
import { LayoutContext } from '@/layouts/layout'
import { getAllLibraries } from '@/lib/github'

const Templates = ({ librariesData }) => {
  const { setPrimaryNavData, setSecondaryNavData } = useContext(LayoutContext)

  const { template } = type

  const seo = {
    title: 'Templates'
  }

  useEffect(() => {
    setPrimaryNavData(homeNavData)
    setSecondaryNavData()
  }, [setPrimaryNavData, setSecondaryNavData])

  return (
    <>
      <NextSeo {...seo} />
      <PageHeader bgColor={template.bgColor} title={seo.title} pictogram={template.icon} />
      <Catalog data={librariesData} type="template" />
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
