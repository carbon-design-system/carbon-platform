/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'
import { NextSeo } from 'next-seo'
import { useContext, useEffect } from 'react'

import PageHeader from '@/components/page-header'
import { assetsNavData } from '@/data/nav-data'
import { pageHeaders } from '@/data/page-headers'
import { LayoutContext } from '@/layouts/layout'

import styles from './pages.module.scss'

const DesignKits = () => {
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
      <Grid>
        <Column sm={4} md={8} lg={12}>
          <div className={styles.content}>Coming soon!</div>
        </Column>
      </Grid>
    </>
  )
}

export default DesignKits
