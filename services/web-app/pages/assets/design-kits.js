/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'
import { NextSeo } from 'next-seo'
import { useContext, useEffect } from 'react'

import { assetsNavData } from '@/data/nav-data'
import { LayoutContext } from '@/layouts/layout'

import styles from '../pages.module.scss'

const DesignKits = () => {
  const { setPrimaryNavData, setSecondaryNavData } = useContext(LayoutContext)

  const seo = {
    title: 'Design kits'
  }

  useEffect(() => {
    setPrimaryNavData(assetsNavData)
    setSecondaryNavData()
  }, [setPrimaryNavData, setSecondaryNavData])

  return (
    <>
      <NextSeo {...seo} />
      <Grid>
        <Column sm={4} md={8} lg={12}>
          <div className={styles.content}>Design kits page coming soon...</div>
        </Column>
      </Grid>
    </>
  )
}

export default DesignKits
