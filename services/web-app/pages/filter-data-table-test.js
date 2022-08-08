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
      <FilterDataTable designKitsData={designKitsData} />
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
