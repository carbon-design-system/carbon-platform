/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Button, Column, Grid, Link as CarbonLink } from '@carbon/react'
import { ArrowRight, Launch } from '@carbon/react/icons'
import { Svg32Github, Svg64Community } from '@carbon-platform/icons'
import clsx from 'clsx'
import { get } from 'lodash'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { useContext, useEffect, useRef } from 'react'
import { libraryPropTypes } from 'types'

import { Dashboard, DashboardItem } from '@/components/dashboard'
import dashboardStyles from '@/components/dashboard/dashboard.module.scss'
import ExternalLinks from '@/components/external-links'
import PageBreadcrumb from '@/components/page-breadcrumb'
import PageHeader from '@/components/page-header'
import PageNav from '@/components/page-nav'
import PageTabs from '@/components/page-tabs'
import StatusIcon from '@/components/status-icon'
import { framework } from '@/data/framework'
import { status } from '@/data/status'
import { teams } from '@/data/teams'
import { type } from '@/data/type'
import { LayoutContext } from '@/layouts/layout'
import { getAssetIssueCount, getLibraryData } from '@/lib/github'
import pageStyles from '@/pages/pages.module.scss'
import { getTagsList } from '@/utils/schema'

import styles from './[asset].module.scss'

const Asset = ({ libraryData, params }) => {
  const { setPrimaryNavData, setSecondaryNavData } = useContext(LayoutContext)
  const router = useRouter()
  const contentRef = useRef(null)

  useEffect(() => {
    setPrimaryNavData()
    setSecondaryNavData()
  }, [setPrimaryNavData, setSecondaryNavData])

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

  const libraryPath = `/libraries/${params.library}/${params.ref}`
  const designKitsPath = libraryPath + '/design-kits'

  const breadcrumbItems = [
    {
      name: libraryData?.content?.name ?? 'Library',
      path: libraryPath
    },
    {
      name: 'Assets',
      path: libraryPath + '/assets'
    },
    {
      name
    }
  ]

  const seo = {
    title: name,
    description
  }

  const { sponsor } = assetData.params
  const SponsorIcon = teams[sponsor] ? teams[sponsor].pictogram : Svg64Community

  const isPathAbsolute = (path) => {
    const testPath = /^https?:\/\//i

    return testPath.test(path)
  }

  const pageTabs = [
    {
      name: 'Overview',
      path: ''
    },
    {
      name: 'Usage',
      path: ''
    },
    {
      name: 'Design',
      path: ''
    },
    {
      name: 'Code',
      path: ''
    },
    {
      name: 'Accessibility',
      path: ''
    }
  ]

  let externalDocsLink

  if (assetData.content.externalDocsUrl) {
    externalDocsLink = {
      name: 'External docs',
      url: assetData.content.externalDocsUrl
    }
  }

  const pageNavItems = [
    {
      title: 'Dashboard',
      id: 'dashboard'
    },
    {
      title: 'Live demo',
      id: 'live-demo'
    },
    {
      title: 'Related assets',
      id: 'related-assets'
    }
  ]
  const githubRepoUrl = `https://${assetData.params.host}/${assetData.params.org}/${assetData.params.repo}`

  return (
    <div ref={contentRef}>
      <NextSeo {...seo} />
      <Grid>
        <Column sm={4} md={8} lg={{ start: 5, span: 12 }}>
          <PageHeader
            bgColor={get(type, `[${assetData.content.type}].bgColor`)}
            title={seo.title}
            pictogram={get(type, `[${assetData.content.type}].icon`)}
          />
          <PageBreadcrumb items={breadcrumbItems} />
          <PageTabs tabs={pageTabs} />
        </Column>
        <Column sm={4} md={8} lg={4}>
          <PageNav items={pageNavItems} contentRef={contentRef} />
        </Column>
        <Column sm={4} md={8} lg={12}>
          <section id="dashboard">
            <Dashboard className={styles.dashboard}>
              <Column className={dashboardStyles.column} sm={4}>
                <DashboardItem
                  aspectRatio={{ sm: '2x1', md: '1x1', lg: '3x4', xlg: '1x1' }}
                  border={['sm']}
                >
                  <dl>
                    <dt className={dashboardStyles.label}>Library</dt>
                    <dd className={dashboardStyles['label--large']}>{libraryData.content.name}</dd>
                  </dl>
                  <Link href={libraryPath} passHref>
                    <CarbonLink className={dashboardStyles['meta-link--large']}>
                      {`v${libraryData.content.version}`}
                    </CarbonLink>
                  </Link>
                  {SponsorIcon && (
                    <SponsorIcon
                      className={clsx(
                        dashboardStyles['position-bottom-left'],
                        styles['sponsor-icon']
                      )}
                      size={64}
                    />
                  )}
                </DashboardItem>
              </Column>
              <Column className={dashboardStyles.column} sm={4} lg={8}>
                <DashboardItem aspectRatio={{ sm: '1x1', lg: 'none', xlg: 'none' }} border={['sm']}>
                  <Grid as="dl" className={dashboardStyles.subgrid}>
                    <Column className={dashboardStyles.subcolumn} sm={2} lg={4}>
                      <dt className={dashboardStyles.label}>Sponsor</dt>
                      <dd className={dashboardStyles.meta}>
                        {get(teams, `[${assetData.params.sponsor}].name`, 'Community maintained')}
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
                        {get(framework, `[${assetData.content.framework}].name`, '–')}
                      </dd>
                    </Column>
                    <Column className={dashboardStyles.subcolumn} sm={2} lg={4}>
                      <dt className={dashboardStyles.label}>Status</dt>
                      <dd className={dashboardStyles.meta}>
                        <StatusIcon
                          className={styles['status-icon']}
                          status={assetData.content.status}
                        />
                        {get(status, `[${assetData.content.status}].name`, '–')}
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
                      <dt className={clsx(dashboardStyles.label)}>Links</dt>
                      <dd className={dashboardStyles.meta}>
                        <ExternalLinks
                          links={[...get(assetData, 'content.demoLinks', []), externalDocsLink]}
                        />
                      </dd>
                    </Column>
                    <Column className={dashboardStyles.subcolumn} sm={2} lg={4}>
                      <dt className={dashboardStyles.label}>Tags</dt>
                      <dd className={dashboardStyles.meta}>
                        {getTagsList(assetData).join(', ') || '–'}
                      </dd>
                    </Column>
                    <Button
                      className={styles['kits-button']}
                      onClick={() => {
                        router.push(designKitsPath)
                      }}
                    >
                      View design kits
                      <ArrowRight size={16} />
                    </Button>
                  </Grid>
                </DashboardItem>
              </Column>
              <Column className={dashboardStyles.column} sm={0} md={4}>
                <DashboardItem
                  aspectRatio={{ md: '2x1', lg: '16x9', xlg: '2x1' }}
                  border={['sm', 'md', 'lg', 'xlg']}
                  href={`${githubRepoUrl}/issues/?q=is%3Aissue+is%3Aopen+in%3Atitle+${assetData.content.name}`}
                >
                  <dl>
                    <dt className={dashboardStyles.label}>Open issues</dt>
                    <dd className={dashboardStyles['label--large']}>
                      {assetData.content.issueCount || 0}
                    </dd>
                  </dl>
                  <Svg32Github
                    className={clsx(styles['github-icon'], dashboardStyles['position-bottom-left'])}
                  />
                  {isPathAbsolute(githubRepoUrl) && (
                    <Launch className={dashboardStyles['position-bottom-right']} size={20} />
                  )}
                </DashboardItem>
              </Column>
              <Column className={dashboardStyles.column} sm={0} md={4}>
                <DashboardItem
                  aspectRatio={{ md: '2x1', lg: '16x9', xlg: '2x1' }}
                  border={['sm', 'md', 'lg', 'xlg']}
                  href={`${githubRepoUrl}/discussions/?discussions_q=in%3Atitle+${assetData.content.id}`}
                >
                  <dl>
                    <dt className={dashboardStyles.label}>Discussions</dt>
                    <dd className={dashboardStyles['label-large']}>–</dd>
                  </dl>
                  <Svg32Github
                    className={clsx(styles['github-icon'], dashboardStyles['position-bottom-left'])}
                  />
                  {isPathAbsolute(githubRepoUrl) && (
                    <Launch className={dashboardStyles['position-bottom-right']} size={20} />
                  )}
                </DashboardItem>
              </Column>
            </Dashboard>
          </section>
          <section id="live-demo">
            <h2 className={pageStyles.h2}>Live demo</h2>
          </section>
          <section id="related-assets">
            <h2 className={pageStyles.h2}>Related assets</h2>
          </section>
        </Column>
      </Grid>
    </div>
  )
}

Asset.propTypes = {
  libraryData: libraryPropTypes
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

  return {
    props: {
      libraryData,
      params
    }
  }
}

export default Asset
