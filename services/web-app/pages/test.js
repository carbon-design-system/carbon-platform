/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { NextSeo } from 'next-seo'
import { useContext, useEffect } from 'react'

import PageNotFound from '@/components/page-not-found'
import { testNavData } from '@/data/nav-data'
import { LayoutContext } from '@/layouts/layout'

const FourOhFour = () => {
  const { setNavData } = useContext(LayoutContext)

  useEffect(() => {
    setNavData(testNavData)
  }, [setNavData])

  const seo = {
    title: 'Page not found'
  }

  return (
    <>
      <NextSeo {...seo} />
      <PageNotFound />
    </>
  )
}

export default FourOhFour
