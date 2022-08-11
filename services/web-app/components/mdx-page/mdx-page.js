/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Head from 'next/head'
import { NextSeo } from 'next-seo'
import PropTypes from 'prop-types'
import { useContext, useEffect } from 'react'
import slugify from 'slugify'

import PageHeader from '@/components/page-header'
import PageTabs from '@/components/page-tabs'
import { assetsNavData } from '@/data/nav-data'
import { LayoutContext } from '@/layouts/layout'

import ContentNotFoundExceptionContent from './errors/content-not-found-exception-content'
import ExportFoundExceptionContent from './errors/export-found-exception-content'
import FallbackExceptionContent from './errors/fallback-exception-content'
import ImportFoundExceptionContent from './errors/import-found-exception-content'
import MdxParseExceptionContent from './errors/mdx-parse-exception-content'
import WarningsRollup from './errors/warnings-rollup'
import styles from './mdx-page.module.scss'

const getTabData = (tabs) => {
  return tabs.map((tab) => ({
    name: tab,
    path: slugify(tab, { strict: true, lower: true })
  }))
}

const errorMap = {
  ContentNotFoundException: ContentNotFoundExceptionContent,
  ImportFoundException: ImportFoundExceptionContent,
  ExportFoundException: ExportFoundExceptionContent,
  MdxParseException: MdxParseExceptionContent,
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
    <div className={styles['page-content']}>
      {warnings?.length > 0 && <WarningsRollup warnings={warnings} />}
      {children}
    </div>
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

const MdxPage = ({ title, description, keywords, tabs, mdxError, warnings, children }) => {
  const { setPrimaryNavData } = useContext(LayoutContext)
  const areTabsPresent = tabs && tabs.length > 0

  useEffect(() => {
    setPrimaryNavData(assetsNavData)
  }, [setPrimaryNavData])

  return (
    <>
      {createSeo({ title, description, keywords })}
      {title && <PageHeader title={title} withTabs={areTabsPresent} />}
      {areTabsPresent && <PageTabs title={title} tabs={getTabData(tabs)} />}
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
   * Tabs to display on the page.
   */
  tabs: PropTypes.arrayOf(PropTypes.string),
  /**
   * Title of the page, typically from frontmatter.
   */
  title: PropTypes.string,
  /**
   * array of warnings on the page
   */
  warnings: PropTypes.arrayOf(PropTypes.string)
}

export default MdxPage
