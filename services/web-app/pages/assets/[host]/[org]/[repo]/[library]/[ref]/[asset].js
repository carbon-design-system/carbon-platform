/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Button, Column, Grid, Link as CarbonLink } from '@carbon/react'
import { ArrowRight, Events, Launch } from '@carbon/react/icons'
import { Svg32Github } from '@carbon-platform/icons'
import clsx from 'clsx'
import { get } from 'lodash'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { useContext, useEffect } from 'react'
import { libraryPropTypes } from 'types'

import { Dashboard, DashboardItem } from '@/components/dashboard'
import dashboardStyles from '@/components/dashboard/dashboard.module.scss'
import ExternalLinks from '@/components/external-links'
import PageBreadcrumb from '@/components/page-breadcrumb'
import PageHeader from '@/components/page-header'
import StatusIcon from '@/components/status-icon'
import { framework } from '@/data/framework'
import { assetsNavData } from '@/data/nav-data'
import { status } from '@/data/status'
import { teams } from '@/data/teams'
import { type } from '@/data/type'
import { LayoutContext } from '@/layouts/layout'
import { getAssetIssueCount, getLibraryData } from '@/lib/github'
import pageStyles from '@/pages/pages.module.scss'
import { getTagsList } from '@/utils/schema'
import { getSlug } from '@/utils/slug'

import styles from './[asset].module.scss'

const Asset = ({ libraryData }) => {
  const { setNavData } = useContext(LayoutContext)
  const router = useRouter()

  useEffect(() => {
    setNavData(assetsNavData)
  }, [setNavData])

  if (router.isFallback) {
    return (
      <div className={pageStyles.content}>
        <h1>Loading...</h1>
      </div>
    )
  }

  const [assetData] = libraryData.assets
  const { name, description } = assetData.content

  const breadcrumbItems = [
    {
      name: 'Libraries',
      path: '/assets/libraries'
    },
    {
      name: libraryData.content.name,
      path: `/assets/${getSlug(libraryData.content)}`
    },
    {
      name
    }
  ]

  const libraryPath = `/assets/${getSlug(libraryData.content)}`

  const seo = {
    title: name,
    description
  }

  const { sponsor } = assetData.params
  const SponsorIcon = teams[sponsor] ? teams[sponsor].icon : Events

  const pathIsAbsolute = (path) => {
    const testPath = /^https?:\/\//i

    return testPath.test(path)
  }

  let externalDocsLink
  if (assetData.content.externalDocsUrl) {
    externalDocsLink = {
      name: 'External docs',
      url: assetData.content.externalDocsUrl
    }
  }

  const githubRepoUrl = `http://${assetData.params.host}/${assetData.params.org}/${assetData.params.repo}`

  return (
    <>
      <NextSeo {...seo} />
      <Grid>
        <Column sm={4} md={8} lg={{ start: 5, span: 12 }}>
          <PageHeader title={seo.title} pictogram={get(type, `[${assetData.content.type}].icon`)} />
          <PageBreadcrumb items={breadcrumbItems} />
        </Column>
        <Column sm={4} md={8} lg={{ start: 5, span: 12 }}>
          <Dashboard className={styles.dashboard}>
            <Column className={dashboardStyles.column} sm={4}>
              <DashboardItem
                aspectRatio={{ sm: '2x1', md: '1x1', lg: '3x4', xlg: '1x1' }}
                border={['sm']}
              >
                <dl>
                  <dt className={dashboardStyles.label}>Library</dt>
                  <dd className={dashboardStyles.labelLarge}>{libraryData.content.name}</dd>
                </dl>
                <Link href={libraryPath} passHref>
                  <CarbonLink className={dashboardStyles.metaLinkLarge}>
                    {`v${libraryData.content.version}`}
                  </CarbonLink>
                </Link>
                {SponsorIcon && (
                  <SponsorIcon
                    className={clsx(dashboardStyles.positionBottomLeft, styles.sponsorIcon)}
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
                      <StatusIcon className={styles.statusIcon} status={assetData.content.status} />
                      {get(status, `[${assetData.content.status}].name`, '–')}
                    </dd>
                  </Column>
                  <Column
                    className={clsx(dashboardStyles.subcolumn, dashboardStyles.subcolumnLinks)}
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
                  <Button className={styles.kitsButton}>
                    Coming soon...
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
                  <dd className={dashboardStyles.labelLarge}>
                    {assetData.content.issueCount || 0}
                  </dd>
                </dl>
                <Svg32Github className={dashboardStyles.positionBottomLeft} />
                {pathIsAbsolute(githubRepoUrl) && (
                  <Launch className={dashboardStyles.positionBottomRight} size={20} />
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
                  <dd className={dashboardStyles.labelLarge}>–</dd>
                </dl>
                <Svg32Github className={dashboardStyles.positionBottomLeft} />
                {pathIsAbsolute(githubRepoUrl) && (
                  <Launch className={dashboardStyles.positionBottomRight} size={20} />
                )}
              </DashboardItem>
            </Column>
          </Dashboard>
        </Column>
      </Grid>
    </>
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
