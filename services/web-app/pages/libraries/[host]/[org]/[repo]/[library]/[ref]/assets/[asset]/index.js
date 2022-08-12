/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Button, ButtonSet, Column, Grid, Link as CarbonLink } from '@carbon/react'
import { ArrowRight, Launch } from '@carbon/react/icons'
import { Svg32Github, Svg64Community } from '@carbon-platform/icons'
import clsx from 'clsx'
import { get } from 'lodash'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { useContext, useEffect, useRef } from 'react'
import { libraryPropTypes, paramsPropTypes } from 'types'

import { Dashboard, DashboardItem } from '@/components/dashboard'
import dashboardStyles from '@/components/dashboard/dashboard.module.scss'
import DemoLinks from '@/components/demo-links'
import { H2 } from '@/components/markdown'
import MdxIcon from '@/components/mdx-icon'
import PageBreadcrumb from '@/components/page-breadcrumb'
import PageHeader from '@/components/page-header'
import PageNav from '@/components/page-nav'
import PageTabs from '@/components/page-tabs'
import StatusIcon from '@/components/status-icon'
import { framework } from '@/data/framework'
import { libraryAllowList } from '@/data/libraries.mjs'
import { assetsNavData } from '@/data/nav-data'
import { status } from '@/data/status'
import { teams } from '@/data/teams'
import { type } from '@/data/type'
import { LayoutContext } from '@/layouts/layout'
import { getAssetIssueCount, getLibraryData } from '@/lib/github'
import pageStyles from '@/pages/pages.module.scss'
import { getAssetType } from '@/utils/schema'
import { getSlug } from '@/utils/slug'

import styles from './index.module.scss'

const Asset = ({ libraryData, params }) => {
  const { setPrimaryNavData } = useContext(LayoutContext)
  const router = useRouter()
  const contentRef = useRef(null)

  useEffect(() => {
    setPrimaryNavData(assetsNavData)
  }, [setPrimaryNavData])

  if (router.isFallback) {
    return (
      <Grid>
        <Column sm={4} md={8} lg={16}>
          <div className={pageStyles.content}>
            <h1>Loading...</h1>
          </div>
        </Column>
      </Grid>
    )
  }

  const [assetData] = libraryData.assets
  const { name, description } = assetData.content

  const breadcrumbItems = [
    {
      name: getAssetType(assetData).namePlural,
      path: getAssetType(assetData).path
    },
    {
      name
    }
  ]

  const libraryPath = `/libraries/${getSlug(libraryData.content)}/${params.ref}`

  const seo = {
    title: name,
    description
  }

  const { maintainer } = assetData.params
  const MaintainerIcon = teams[maintainer] ? teams[maintainer].pictogram : Svg64Community

  const isPathAbsolute = (path) => {
    const testPath = /^https?:\/\//i

    return testPath.test(path)
  }

  const pageTabs = [
    {
      name: 'Overview',
      path: `/libraries/${assetData.params.library}/latest/assets/${getSlug(assetData.content)}`
    },
    {
      name: 'Usage',
      path: `/libraries/${assetData.params.library}/latest/assets/${getSlug(
        assetData.content
      )}/usage`
    },
    {
      name: 'Design',
      path: `/libraries/${assetData.params.library}/latest/assets/${getSlug(
        assetData.content
      )}/design`
    },
    {
      name: 'Code',
      path: `/libraries/${assetData.params.library}/latest/assets/${getSlug(
        assetData.content
      )}/code`
    },
    {
      name: 'Accessibility',
      path: `/libraries/${assetData.params.library}/latest/assets/${getSlug(
        assetData.content
      )}/accessibility`
    }
  ]

  const pageNavItems = [
    {
      title: 'Dashboard',
      id: 'dashboard'
    }
  ]
  if (libraryData.content.demoLinks) {
    pageNavItems.push({
      title: 'Demo links',
      id: 'demo-links'
    })
  }

  const githubRepoUrl = `https://${assetData.params.host}/${assetData.params.org}/${assetData.params.repo}`

  const frameworkName = assetData.content.framework

  let frameworkIcon = frameworkName
  if (frameworkName === 'vanilla') frameworkIcon = 'js'
  if (frameworkName === 'web-component') frameworkIcon = 'webcomponents'
  if (frameworkName === 'react-native') frameworkIcon = 'react'

  const assetsPath = `/libraries/${params.library}/${params.ref}/assets`

  const designKitPath = `/libraries/${params.library}/${params.ref}/design-kits`

  const otherFrameworks = assetData.content.otherFrameworks

  const otherFrameworkLinks = otherFrameworks
    .sort((a, b) => a.framework.localeCompare(b.framework))
    .map((frameworks, index) => (
      <>
        {index !== 0 && ', '}
        <Link
          href={`/libraries/${frameworks.params.library}/${params.ref}/assets/${params.asset}`}
          passHref
        >
          <CarbonLink size="lg">{frameworks.framework}</CarbonLink>
        </Link>
      </>
    ))

  return (
    <div ref={contentRef}>
      <NextSeo {...seo} />
      <Grid>
        <Column sm={4} md={8} lg={{ start: 5, span: 12 }}>
          <PageHeader
            bgColor={get(type, `[${assetData.content.type}].bgColor`)}
            title={seo.title}
            pictogram={get(type, `[${assetData.content.type}].icon`)}
            withTabs
          />
          <PageBreadcrumb items={breadcrumbItems} />
        </Column>
        <Column sm={4} md={8} lg={{ start: 5, span: 12 }} className={styles['tabs-column']}>
          <PageTabs className={styles['asset-tabs']} tabs={pageTabs} />
        </Column>
        <Column sm={4} md={8} lg={4}>
          <PageNav items={pageNavItems} contentRef={contentRef} />
        </Column>
        <Column sm={4} md={8} lg={12}>
          <section id="dashboard">
            <Dashboard className={styles.dashboard}>
              <Column className={dashboardStyles.column} sm={4}>
                <DashboardItem aspectRatio={{ sm: '2x1', md: '1x1', lg: '3x4', xlg: '1x1' }}>
                  <dl>
                    <dt className={dashboardStyles.label}>Library</dt>
                    <dd className={dashboardStyles['label--large']}>
                      <Link href={libraryPath} passHref>
                        <CarbonLink className={dashboardStyles['meta-link--large']}>
                          {libraryData.content.name}
                          <br />
                          {`v${libraryData.content.version}`}
                        </CarbonLink>
                      </Link>
                    </dd>
                  </dl>
                  {MaintainerIcon && (
                    <MaintainerIcon
                      className={clsx(
                        dashboardStyles['position-bottom-left'],
                        styles['maintainer-icon']
                      )}
                      size={64}
                    />
                  )}
                </DashboardItem>
              </Column>
              <Column className={dashboardStyles.column} sm={4} lg={8}>
                <DashboardItem aspectRatio={{ sm: '3x4', md: '3x4', lg: 'none', xlg: 'none' }}>
                  <Grid as="dl" className={dashboardStyles.subgrid}>
                    <Column className={dashboardStyles.subcolumn} sm={2} lg={4}>
                      <dt className={dashboardStyles.label}>Maintainer</dt>
                      <dd className={dashboardStyles.meta}>
                        {get(teams, `[${assetData.params.maintainer}].name`, 'Community')}
                      </dd>
                    </Column>
                    <Column className={dashboardStyles.subcolumn} sm={2} lg={4}>
                      <dt className={dashboardStyles.label}>Type</dt>
                      <dd className={dashboardStyles.meta}>
                        {get(type, `[${assetData.content.type}].name`, '–')}
                      </dd>
                    </Column>
                    <Column className={dashboardStyles.subcolumn} sm={2} lg={4}>
                      <dt className={dashboardStyles.label}>Framework</dt>
                      <dd className={dashboardStyles.meta}>
                        <MdxIcon
                          name={frameworkIcon}
                          className={dashboardStyles['framework-icon']}
                        />

                        {get(framework, `[${assetData.content.framework}].name`, '–')}
                      </dd>
                    </Column>
                    <Column className={dashboardStyles.subcolumn} sm={2} lg={4}>
                      <dt className={dashboardStyles.label}>Status</dt>
                      <dd className={dashboardStyles.meta}>
                        <StatusIcon
                          className={styles['status-icon']}
                          status={assetData.statusKey}
                        />
                        {status[assetData.statusKey]?.name || '-'}
                      </dd>
                    </Column>
                    <Column
                      className={clsx(
                        dashboardStyles.subcolumn,
                        dashboardStyles['subcolumn--links']
                      )}
                      sm={2}
                      lg={4}
                    >
                      <dt className={dashboardStyles.label}>Other frameworks</dt>
                      <dd className={clsx(dashboardStyles.meta, styles['other-frameworks'])}>
                        {otherFrameworks.length > 0 ? otherFrameworkLinks : '–'}
                      </dd>
                    </Column>
                    <Column className={dashboardStyles.subcolumn} sm={2} lg={4}>
                      <dt className={dashboardStyles.label}>Design files</dt>
                      <dd className={dashboardStyles.meta}>
                        <Link href={designKitPath} passHref>
                          <CarbonLink size="lg">View compatible kits</CarbonLink>
                        </Link>
                      </dd>
                    </Column>
                  </Grid>
                  <ButtonSet className={dashboardStyles['button-set']}>
                    <Button
                      className={dashboardStyles['dashboard-button']}
                      onClick={() => {
                        router.push(assetsPath)
                      }}
                    >
                      View library assets
                      <ArrowRight size={16} />
                    </Button>{' '}
                    <Button
                      kind="tertiary"
                      className={dashboardStyles['dashboard-button']}
                      href={assetData.content.externalDocsUrl}
                    >
                      View asset docs
                      <Launch size={16} />
                    </Button>
                  </ButtonSet>
                </DashboardItem>
              </Column>
              <Column className={dashboardStyles.column} sm={0} md={4}>
                <DashboardItem
                  aspectRatio={{ md: '2x1', lg: '16x9', xlg: '2x1' }}
                  href={`${githubRepoUrl}/issues/?q=is%3Aissue+is%3Aopen+in%3Atitle+${assetData.content.name}`}
                >
                  <dl>
                    <dt className={dashboardStyles.label}>Open issues</dt>
                    <dd className={dashboardStyles['label--large']}>
                      {assetData.content.issueCount || 0}
                    </dd>
                  </dl>
                  <Svg32Github className={dashboardStyles['position-bottom-left']} />
                  {isPathAbsolute(githubRepoUrl) && (
                    <Launch className={dashboardStyles['position-bottom-right']} size={20} />
                  )}
                </DashboardItem>
              </Column>
              <Column className={dashboardStyles.column} sm={0} md={4}>
                <DashboardItem
                  aspectRatio={{ md: '2x1', lg: '16x9', xlg: '2x1' }}
                  href={`${githubRepoUrl}/discussions/?discussions_q=in%3Atitle+${assetData.content.id}`}
                >
                  <dl>
                    <dt className={dashboardStyles.label}>Discussions</dt>
                    <dd className={dashboardStyles['label--large']}>–</dd>
                  </dl>
                  <Svg32Github className={dashboardStyles['position-bottom-left']} />
                  {isPathAbsolute(githubRepoUrl) && (
                    <Launch className={dashboardStyles['position-bottom-right']} size={20} />
                  )}
                </DashboardItem>
              </Column>
              {libraryData.content.demoLinks && (
                <Column sm={4} md={8} lg={8}>
                  <section id="demo-links">
                    <H2>Demo links</H2>
                    <DemoLinks links={[...get(libraryData, 'content.demoLinks', [])]} />
                  </section>
                </Column>
              )}
            </Dashboard>
          </section>
        </Column>
      </Grid>
    </div>
  )
}

Asset.propTypes = {
  libraryData: libraryPropTypes,
  params: paramsPropTypes
}

export const getServerSideProps = async ({ params }) => {
  const libraryData = await getLibraryData(params)

  if (!libraryData || !libraryData.assets || !libraryData.assets.length) {
    return {
      notFound: true
    }
  }

  const [assetData] = libraryData.assets
  assetData.content.issueCount = await getAssetIssueCount(assetData)

  const otherAssetFrameworks = []
  if (libraryData.params.group) {
    for (const [slug, libraryParams] of Object.entries(libraryAllowList)) {
      if (libraryParams.group === libraryData.params.group) {
        const relatedLibData = await getLibraryData({
          library: slug,
          ref: 'latest',
          ...libraryParams,
          asset: params.asset
        })
        if (
          relatedLibData?.content.id !== libraryData.content.id &&
          !relatedLibData?.content?.noIndex &&
          relatedLibData.assets?.length &&
          !relatedLibData.assets[0].content?.noIndex &&
          relatedLibData.assets[0].content?.framework
        ) {
          otherAssetFrameworks.push({
            framework: relatedLibData.assets[0]?.content.framework,
            params: {
              library: slug,
              ref: 'latest',
              ...libraryParams,
              asset: params.asset
            }
          })
        }
      }
    }
  }

  assetData.content.otherFrameworks = otherAssetFrameworks

  return {
    props: {
      libraryData,
      params
    }
  }
}

export default Asset
