/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Head from 'next/head'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import PropTypes from 'prop-types'
import { useContext, useEffect } from 'react'
import slugify from 'slugify'

import ContentWrapper from '@/components/content-wrapper'
import PageHeader from '@/components/page-header'
import PageTabs from '@/components/page-tabs'
import { assetsNavData } from '@/data/nav-data'
import { pageHeaders } from '@/data/page-headers'
import { LayoutContext } from '@/layouts/layout'
import useMetaTitle from '@/utils/use-meta-title'

import ContentNotFoundExceptionContent from './errors/content-not-found-exception-content'
import ExportFoundExceptionContent from './errors/export-found-exception-content'
import FallbackExceptionContent from './errors/fallback-exception-content'
import ImportFoundExceptionContent from './errors/import-found-exception-content'
import MdxCompileExceptionContent from './errors/mdx-compile-exception-content'
import WarningsRollup from './errors/warnings-rollup/warnings-rollup'

const errorMap = {
  ContentNotFoundException: ContentNotFoundExceptionContent,
  ImportFoundException: ImportFoundExceptionContent,
  ExportFoundException: ExportFoundExceptionContent,
  MdxCompileException: MdxCompileExceptionContent,
  fallback: FallbackExceptionContent
}

const createMdxErrorContent = ({ mdxError }) => {
  if (!mdxError) {
    return null
  }

  const Component = errorMap[mdxError.name] || errorMap.fallback

  return <Component mdxError={mdxError} />
}

const createPageContent = ({ children, mdxError, warnings }) => {
  if (mdxError) {
    return createMdxErrorContent({ mdxError })
  }

  return (
    <ContentWrapper>
      {warnings?.length > 0 && <WarningsRollup warnings={warnings} />}
      {children}
    </ContentWrapper>
  )
}

const createSeo = ({ title, description, keywords }) => {
  return (
    <>
      <NextSeo title={title} description={description} />
      {keywords && (
        <Head>
          <meta name="keywords" content={keywords} />
        </Head>
      )}
    </>
  )
}

const MdxPage = ({
  title,
  description,
  keywords,
  tabs,
  mdxError,
  warnings,
  children,
  pageHeaderType,
  metaTitle
}) => {
  const { setPrimaryNavData } = useContext(LayoutContext)
  const router = useRouter()
  const areTabsPresent = tabs && tabs.length > 0
  let defaultMetaTitle = useMetaTitle([], areTabsPresent)

  const pathSegments = router.asPath.split('/').filter(Boolean)
  pathSegments.pop()
  const baseSegment = pathSegments.join('/')

  const tabsData = tabs.map((tab) => {
    if (tab?.name && tab?.path) {
      return tab
    }
    const tabSlug = slugify(tab, { strict: true, lower: true })
    return {
      name: tab,
      path: baseSegment ? `/${baseSegment}/${tabSlug}` : `/${tabSlug}`
    }
  })

  const pageHeader = pageHeaders[pageHeaderType] ?? {}

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        // This could be improved by assigning a ref to the component and using
        // Prism.highlightElement() instead.
        window.Prism && window.Prism.highlightAll()
      }
    } catch (err) {
      console.error(err)
    }
  }, [])

  useEffect(() => {
    setPrimaryNavData(assetsNavData)
  }, [setPrimaryNavData])

  // If the page's path matches nav data, and the page has tabs, append the tab name
  if (defaultMetaTitle && areTabsPresent) {
    const tabName = tabsData.reduce((str, tab) => {
      if (tab.path === router.asPath) {
        return tab.name
      }
      return str
    }, '')

    if (tabName) {
      defaultMetaTitle = `${tabName} - ${defaultMetaTitle}`
    }
  }

  // First see if a meta title is available using the router path and nav data. If that's not
  // availble, try the meta title passed into the MdxPage component. If that's not available,
  // use the title that's shown in the PageHeader.
  const fullTitle = defaultMetaTitle || metaTitle || title

  return (
    <>
      {createSeo({ title: fullTitle, description, keywords })}
      {title && (
        <PageHeader
          title={title}
          withTabs={areTabsPresent}
          bgColor={pageHeader?.bgColor}
          pictogram={pageHeader?.icon}
        />
      )}
      {areTabsPresent && <PageTabs title="Page tabs" tabs={tabsData} />}
      {createPageContent({ children, mdxError, warnings })}
    </>
  )
}

MdxPage.propTypes = {
  /**
   * The component representing the actual MDX to render. This should have already been sanitized.
   */
  children: PropTypes.node,
  /**
   * Description of the page, typically from frontmatter.
   */
  description: PropTypes.string,
  /**
   * Keywords to pass through to SEO.
   */
  keywords: PropTypes.arrayOf(PropTypes.string),
  /**
   * Full-page error details (if applicable).
   */
  mdxError: PropTypes.shape({
    name: PropTypes.string,
    message: PropTypes.string,
    stack: PropTypes.string
  }),
  /**
   * Title to use for SEO
   */
  metaTitle: PropTypes.string,
  /**
   * Page header type that determines background color and pictogram
   */
  pageHeaderType: PropTypes.string,
  /**
   * Tabs to display on the page.
   */
  tabs: PropTypes.arrayOf(PropTypes.string),
  /**
   * Title of the page, typically from frontmatter
   */
  title: PropTypes.string,
  /**
   * array of warnings on the page
   */
  warnings: PropTypes.arrayOf(PropTypes.string)
}

export default MdxPage
