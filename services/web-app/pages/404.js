/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { NextSeo } from 'next-seo'
import { useContext, useEffect } from 'react'

// import FullPageError from '@/components/full-page-error'
import InlineError from '@/components/inline-error'
// import PageNotFound from '@/components/page-not-found'
import { assetsNavData } from '@/data/nav-data'
import { LayoutContext } from '@/layouts/layout'

const FourOhFour = () => {
  const { setPrimaryNavData } = useContext(LayoutContext)

  useEffect(() => {
    setPrimaryNavData(assetsNavData)
  }, [setPrimaryNavData])

  const seo = {
    title: 'Page not found'
  }

  return (
    <>
      <NextSeo {...seo} />
      {/* <PageNotFound /> */}
      <InlineError
        title="Import or export statement identified"
        description="For security concerns, import and export
        statements are not allowed and should be removed."
        link="Supported components"
        href="catalogs/components"
        content="import {something} from './the/path/where/it/lives/in/the/remote/repo'"
      />
      {/* <FullPageError
        title="Something's gone wrong..."
        subtitle="Import or export statement identified"
        description="For security concerns, import and export statements are not allowed and should be removed"
        content="> 1 | Could show line that needs to be removed"
      /> */}
    </>
  )
}

export default FourOhFour
