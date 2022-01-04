/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Construct } from '@carbon/pictograms-react'
import { NextSeo } from 'next-seo'
import { useContext, useEffect } from 'react'

import Catalog from '@/components/catalog'
import PageHeader from '@/components/page-header'
import { assetsNavData } from '@/data/nav-data'
import { LayoutContext } from '@/layouts/layout'
import { getAllLibraries } from '@/lib/github'

const Elements = ({ librariesData }) => {
  const { setNavData } = useContext(LayoutContext)

  const seo = {
    title: 'Elements'
  }

  useEffect(() => {
    setNavData(assetsNavData)
  }, [setNavData])

  return (
    <>
      <NextSeo {...seo} />
      <PageHeader title={seo.title} pictogram={Construct} />
      <Catalog data={librariesData} type="element" />
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

export default Elements
