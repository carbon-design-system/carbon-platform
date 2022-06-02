/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { NextSeo } from 'next-seo'
import { useContext, useEffect } from 'react'

import defaultSeo from '@/config/seo.json'
import { LayoutContext } from '@/layouts/layout'

import styles from './pages.module.scss'

const navData = [
  {
    path: '/',
    title: 'About Carbon'
  }
]

const Index = () => {
  const { setPrimaryNavData } = useContext(LayoutContext)

  const seo = {
    title: defaultSeo.title,
    titleTemplate: '%s'
  }

  useEffect(() => {
    setPrimaryNavData(navData)
  }, [setPrimaryNavData])

  return (
    <>
      <NextSeo {...seo} />
      <div className={styles.content}>Home</div>
    </>
  )
}

export default Index
