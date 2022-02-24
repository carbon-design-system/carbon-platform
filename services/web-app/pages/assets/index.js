/* eslint-disable max-len */
/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { NextSeo } from 'next-seo'
import { useContext, useEffect } from 'react'

import Footer from '@/components/footer'
import PageHeaderLarge from '@/components/page-header-large/page-header-large'
import { assetsNavData } from '@/data/nav-data'
import { type } from '@/data/type'
import { LayoutContext } from '@/layouts/layout'
import AssetLandingPage from '@/pages/assets/asset-landing-page'

const Index = () => {
  const { setNavData } = useContext(LayoutContext)

  const seo = {
    title: 'Assets'
  }

  const title = 'Building the future of our design system together'

  const description =
    'IBM teams collectively maintain thousands of reusable assets, such as components and patterns, that enable us to deliver better experiences, faster. But for designers and developers, it can be challenging to find the right assets that comply with platform requirements, are convenient to implement, and are consistent with design patterns across the company.'

  useEffect(() => {
    setNavData(assetsNavData)
  }, [setNavData])

  return (
    <>
      <NextSeo {...seo} />
      <PageHeaderLarge title={title} description={description} pictogram={type.element.icon} />
      <AssetLandingPage />
      <Footer />
    </>
  )
}

export default Index
