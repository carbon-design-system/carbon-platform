/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Head from 'next/head'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { useContext, useEffect } from 'react'
import slugify from 'slugify'

import PageHeader from '@/components/page-header'
import PageTabs from '@/components/page-tabs'
import { assetsNavData } from '@/data/nav-data'
import { pageHeaders } from '@/data/page-headers'
import { LayoutContext } from '@/layouts/layout'

import styles from './mdx-wrapper.module.scss'

const MdxWrapper = ({ children, ...props }) => {
  const { setPrimaryNavData } = useContext(LayoutContext)
  const router = useRouter()
  const frontmatter = JSON.parse(props.frontmatter)
  if (props.ignoreTabs) {
    delete frontmatter.tabs
  }
  const { title, description, tabs, keywords, pageHeaderType } = frontmatter
  const pathSegments = router.asPath.split('/').filter(Boolean)
  pathSegments.pop()
  const baseSegment = pathSegments.join('/')
  const pageHeader = pageHeaders?.[pageHeaderType] ?? {}

  useEffect(() => {
    setPrimaryNavData(assetsNavData)
  }, [setPrimaryNavData])
  const withTabs = tabs != null

  return (
    <>
      <NextSeo title={title} description={description} keywords={keywords} />
      {title && (
        <PageHeader
          title={title}
          withTabs={withTabs}
          bgColor={pageHeader?.bgColor}
          pictogram={pageHeader?.icon}
        />
      )}
      {keywords && (
        <Head>
          <meta name="keywords" content={keywords} />
        </Head>
      )}
      {tabs && (
        <PageTabs
          title={title}
          tabs={tabs.map((tab) => {
            const tabSlug = slugify(tab, { strict: true, lower: true })
            return {
              name: tab,
              path: baseSegment ? `/${baseSegment}/${tabSlug}` : `/${tabSlug}`
            }
          })}
        />
      )}
      <div className={styles['page-content']}>{children}</div>
    </>
  )
}

export default MdxWrapper
