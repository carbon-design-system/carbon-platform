/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Head from 'next/head'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import slugify from 'slugify'

import PageHeader from '@/components/page-header'
import PageTabs from '@/components/page-tabs'

const MdxWrapper = ({ children, ...props }) => {
  const router = useRouter()
  const { title, description, tabs, keywords } = JSON.parse(props.frontmatter)
  const pathSegments = router.pathname.split('/').filter(Boolean)
  pathSegments.pop()
  const baseSegment = pathSegments.join('/')
  const withTabs = tabs != null

  return (
    <>
      <NextSeo title={title} description={description} keywords={keywords} />
      {title && <PageHeader title={title} withTabs={withTabs} />}
      {keywords && (
        <Head>
          <meta name="keywords" content={keywords} />
        </Head>
      )}
      {tabs && (
        <PageTabs
          title={title}
          tabs={tabs.map((tab) => {
            return { name: tab, path: `/${baseSegment}/${slugify(tab, { strict: true })}` }
          })}
        />
      )}
      {children}
    </>
  )
}

export default MdxWrapper
