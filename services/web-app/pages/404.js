/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { getRunMode } from '@carbon-platform/api/run-mode'
import { NextSeo } from 'next-seo'
import { useContext, useEffect } from 'react'

import { assetsNavData } from '@/data/nav-data'
import { LayoutContext } from '@/layouts/layout'

console.log(getRunMode())

const FourOhFour = () => {
  const { setNavData } = useContext(LayoutContext)

  useEffect(() => {
    setNavData(assetsNavData)
  }, [setNavData])

  const seo = {
    title: 'Page not found'
  }

  return (
    <>
      <NextSeo {...seo} />
      <h1>Page not found.</h1>
    </>
  )
}

export default FourOhFour
