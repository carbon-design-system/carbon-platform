/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { NextSeo } from 'next-seo'
import { useContext, useEffect } from 'react'

import { assetsNavData } from '@/data/nav-data'
import { LayoutContext } from '@/layouts/layout'

import styles from './pages.module.scss'

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
      <div className={styles.content}>Page not found</div>
    </>
  )
}

export default FourOhFour
