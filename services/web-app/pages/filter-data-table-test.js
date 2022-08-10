/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { NextSeo } from 'next-seo'
import { useContext, useEffect } from 'react'

import FilterDataTable from '@/components/filter-data-table'
import { assetsNavData } from '@/data/nav-data'
import { LayoutContext } from '@/layouts/layout'
import { getAllDesignKits } from '@/lib/github'

const FilterDataTableTest = ({ designKitsData }) => {
  const { setPrimaryNavData } = useContext(LayoutContext)

  useEffect(() => {
    setPrimaryNavData(assetsNavData)
  }, [setPrimaryNavData])

  const seo = {
    title: 'Filter Data Table'
  }

  return (
    <>
      <NextSeo {...seo} />
      <FilterDataTable
        designKitsData={designKitsData}
        designTools={['Figma', 'Sketch', 'Adobe XD', 'Axure']}
        designKitIds={[
          'carbon-white-sketch',
          'carbon-g10-sketch',
          'carbon-g10-adobe-xd',
          'ibm-icons-24-32-sketch',
          'carbon-white-figma',
          'ibm-dotcom-g10-figma'
        ]}
      />
    </>
  )
}

export const getStaticProps = async () => {
  const designKitsData = await getAllDesignKits()

  return {
    props: {
      designKitsData
    }
  }
}

export default FilterDataTableTest
