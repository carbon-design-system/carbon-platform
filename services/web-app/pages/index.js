/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { TextInput } from '@carbon/pictograms-react'
import { NextSeo } from 'next-seo'
import { useContext, useEffect } from 'react'

import PageHeader from '@/components/page-header'
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
      <PageHeader title={seo.title} pictogram={TextInput} />
      <div className={styles.content}>Home</div>
    </>
  )
}

export default Index
