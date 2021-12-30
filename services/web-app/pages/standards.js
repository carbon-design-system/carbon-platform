/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { NextSeo } from 'next-seo'
import { useContext, useEffect } from 'react'

import { standardsNavData } from '@/data/nav-data'
import { LayoutContext } from '@/layouts/layout'

import styles from './pages.module.scss'

const Standards = () => {
  const { setNavData } = useContext(LayoutContext)

  const seo = {
    title: 'Standards'
  }

  useEffect(() => {
    setNavData(standardsNavData)
  }, [setNavData])

  return (
    <>
      <NextSeo {...seo} />
      <div className={styles.content}>Welcome to Standards!</div>
    </>
  )
}

export default Standards
