/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { NextSeo } from 'next-seo'
import PropTypes from 'prop-types'
import { useContext, useEffect } from 'react'

import DesignKitsCatalog from '@/components/design-kits-catalog'
import PageHeader from '@/components/page-header'
import { assetsNavData } from '@/data/nav-data'
import { pageHeaders } from '@/data/page-headers'
import { LayoutContext } from '@/layouts/layout'
import { getAllDesignKits } from '@/lib/github'
import { designKitPropTypes } from '@/types'

const DesignKits = ({ designKitsData }) => {
  const { setPrimaryNavData } = useContext(LayoutContext)

  const pageHeader = pageHeaders?.designKit ?? {}

  const seo = {
    title: 'Design kits'
  }

  useEffect(() => {
    setPrimaryNavData(assetsNavData)
  }, [setPrimaryNavData])

  return (
    <>
      <NextSeo {...seo} />
      <PageHeader bgColor={pageHeader?.bgColor} title={seo.title} pictogram={pageHeader?.icon} />
      <DesignKitsCatalog designKits={designKitsData} />
    </>
  )
}

DesignKits.propTypes = {
  designKitsData: PropTypes.shape({
    designKits: PropTypes.arrayOf(designKitPropTypes)
  })
}

export const getStaticProps = async () => {
  const designKitsData = await getAllDesignKits()

  return {
    props: {
      designKitsData
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every hour
    revalidate: 60 * 60 // In seconds
  }
}

export default DesignKits
