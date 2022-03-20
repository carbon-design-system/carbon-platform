/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { FileBackup } from '@carbon/pictograms-react'
import { Button, Column, Grid } from '@carbon/react'
import { ArrowRight, Events } from '@carbon/react/icons'
import clsx from 'clsx'
import { get } from 'lodash'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { useContext, useEffect } from 'react'
import { libraryPropTypes, paramsPropTypes } from 'types'

import { Dashboard, DashboardItem } from '@/components/dashboard'
import dashboardStyles from '@/components/dashboard/dashboard.module.scss'
import PageBreadcrumb from '@/components/page-breadcrumb'
import PageHeader from '@/components/page-header'
import PageNav from '@/components/page-nav'
import { assetsNavData } from '@/data/nav-data'
import { teams } from '@/data/teams'
import { LayoutContext } from '@/layouts/layout'
import { getLibraryData } from '@/lib/github'
import pageStyles from '@/pages/pages.module.scss'
import { assetSortComparator, getLicense } from '@/utils/schema'
import { getSlug } from '@/utils/slug'

import styles from './index.module.scss'

const Library = ({ libraryData, params }) => {
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

  const { name, description } = libraryData.content

  const breadcrumbItems = [
    {
      name: 'Libraries',
      path: '/assets/libraries'
    },
    {
      name
    }
  ]

  const seo = {
    title: name,
    description
  }

  const assets = libraryData.assets.sort(assetSortComparator)

  const { sponsor } = libraryData.params
  const SponsorIcon = teams[sponsor] ? teams[sponsor].icon : Events

  const pageNavItems = [
    {
      name: 'At a glance',
      path: '#at-a-glance'
    },
    {
      name: 'Dependencies',
      path: '#dependencies'
    },
    {
      name: 'Contributors',
      path: '#contributors'
    }
  ]

  return (
    <>
      <NextSeo {...seo} />
      <Grid>
        <Column sm={4} md={8} lg={{ start: 5, span: 12 }}>
          <PageHeader title={seo.title} pictogram={FileBackup} />
          <PageBreadcrumb items={breadcrumbItems} />
        </Column>
        <Column sm={4} md={8} lg={4}>
          <PageNav items={pageNavItems}></PageNav>
        </Column>
        <Column sm={4} md={8} lg={12}>
          <Dashboard className={styles.dashboard}>
            <Column className={dashboardStyles.column} lg={1} id="at-a-glance">
              <DashboardItem
                aspectRatio={{ sm: '2x1', md: '1x1', lg: '3x4', xlg: '1x1' }}
                border={['sm']}
              >
                <dl>
                  <dt className={dashboardStyles.label}>Version</dt>
                  <dd
                    className={dashboardStyles.labelLarge}
                  >{`v${libraryData.content.version}`}</dd>
                </dl>
                {SponsorIcon && (
                  <SponsorIcon
                    className={clsx(dashboardStyles.positionBottomLeft, styles.sponsorIcon)}
                    size={64}
                  />
                )}
              </DashboardItem>
            </Column>
            <Column className={dashboardStyles.column} lg={2}>
              <DashboardItem aspectRatio={{ sm: '1x1', lg: 'none', xlg: 'none' }} border={['sm']}>
                <Grid as="dl" columns={2} className={dashboardStyles.subgrid}>
                  <Column className={dashboardStyles.subcolumn}>
                    <dt className={dashboardStyles.label}>Sponsor</dt>
                    <dd className={dashboardStyles.meta}>
                      {get(teams, `[${libraryData.params.sponsor}].name`, 'Community maintained')}
                    </dd>
                  </Column>
                  <Column className={dashboardStyles.subcolumn}>
                    <dt className={dashboardStyles.label}>License</dt>
                    <dd className={dashboardStyles.meta}>{getLicense(libraryData)}</dd>
                  </Column>
                  <Column
                    className={clsx(dashboardStyles.subcolumn, dashboardStyles.subcolumnLinks)}
                  >
                    <dt className={clsx(dashboardStyles.label)}>Demos</dt>
                    <dd className={dashboardStyles.meta}>
                      <Link href="https://carbondesignsystem.com">
                        <a className={dashboardStyles.metaLink}>Coming soon...</a>
                      </Link>
                    </dd>
                  </Column>
                  <Button className={styles.versionsButton}>
                    Coming soon...
                    <ArrowRight size={16} />
                  </Button>
                </Grid>
              </DashboardItem>
            </Column>
          </Dashboard>
          <div className={pageStyles.content}>
            <ul>
              {assets.map((asset, i) => (
                <li key={i}>
                  <Link
                    href={`/assets/${asset.params.library}/${params.ref}/${getSlug(asset.content)}`}
                  >
                    <a>{asset.content.name || 'Asset'}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <h3 id="dependencies" className={styles.h3}>
            Dependencies
          </h3>
          <h3 id="contributors" className={styles.h3}>
            Contributors
          </h3>
        </Column>
      </Grid>
    </>
  )
}

Library.propTypes = {
  libraryData: libraryPropTypes,
  params: paramsPropTypes
}

export const getStaticProps = async ({ params }) => {
  const libraryData = await getLibraryData(params)

  if (!libraryData) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      libraryData,
      params
    },
    revalidate: 10
  }
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true
  }
}

export default Library
