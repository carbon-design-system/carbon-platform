/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'
import { NextSeo } from 'next-seo'
import { useContext, useEffect } from 'react'

import defaultSeo from '@/config/seo.json'
import { LayoutContext } from '@/layouts/layout'

import styles from './pages.module.scss'

const navData = []

const Index = () => {
  const { setNavData } = useContext(LayoutContext)

  const seo = {
    title: defaultSeo.title,
    titleTemplate: '%s'
  }

  useEffect(() => {
    setNavData(navData)
  }, [setNavData])

  return (
    <>
      <NextSeo {...seo} />
      <Grid>
        <Column sm={4} md={8} lg={12}>
          <div className={styles.content}>Home page coming soon...</div>
        </Column>
      </Grid>
    </>
  )
}

export default Index
