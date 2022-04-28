/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Button, Column, Grid } from '@carbon/react'
import { ArrowRight, Events } from '@carbon/react/icons'
import clsx from 'clsx'
import { get } from 'lodash'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { useContext, useEffect } from 'react'
import { libraryPropTypes, paramsPropTypes } from 'types'

import { Dashboard, DashboardItem } from '@/components/dashboard'
import dashboardStyles from '@/components/dashboard/dashboard.module.scss'
import ExternalLinks from '@/components/external-links'
import PageHeader from '@/components/page-header'
import { homeNavData } from '@/data/nav-data'
import { teams } from '@/data/teams'
import { LayoutContext } from '@/layouts/layout'
import { getLibraryData, getLibraryNavData } from '@/lib/github'
import pageStyles from '@/pages/pages.module.scss'
import { getLicense } from '@/utils/schema'

import styles from './index.module.scss'

const Library = ({ libraryData, navData }) => {
  const { setPrimaryNavData, setSecondaryNavData } = useContext(LayoutContext)

  const router = useRouter()

  useEffect(() => {
    setPrimaryNavData(homeNavData)
    setSecondaryNavData(navData)
  }, [navData, setPrimaryNavData, setSecondaryNavData])

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

  const { name, description } = libraryData.content

  const seo = {
    title: name,
    description
  }

  const { sponsor } = libraryData.params
  const SponsorIcon = teams[sponsor] ? teams[sponsor].icon : Events

  let externalDocsLink
  if (libraryData.content.externalDocsUrl) {
    externalDocsLink = {
      name: 'External docs',
      url: libraryData.content.externalDocsUrl
    }
  }

  return (
    <>
      <NextSeo {...seo} />
      <Grid>
        <Column sm={4} md={8} lg={12}>
          <PageHeader title={seo.title} />
        </Column>
        <Column sm={4} md={8} lg={12}>
          <Dashboard className={styles.dashboard}>
            <Column className={dashboardStyles.column} sm={4}>
              <DashboardItem
                aspectRatio={{ sm: '2x1', md: '1x1', lg: '3x4', xlg: '1x1' }}
                border={['sm']}
              >
                <dl>
                  <dt className={dashboardStyles.label}>Version</dt>
                  <dd
                    className={dashboardStyles['label--large']}
                  >{`v${libraryData.content.version}`}</dd>
                </dl>
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
                      {get(teams, `[${libraryData.params.sponsor}].name`, 'Community maintained')}
                    </dd>
                  </Column>
                  <Column className={dashboardStyles.subcolumn} sm={2} lg={4}>
                    <dt className={dashboardStyles.label}>License</dt>
                    <dd className={dashboardStyles.meta}>{getLicense(libraryData)}</dd>
                  </Column>
                  <Column
                    sm={4}
                    className={clsx(dashboardStyles.subcolumn, dashboardStyles['subcolumn--links'])}
                  >
                    <dt className={clsx(dashboardStyles.label)}>Links</dt>
                    <dd className={dashboardStyles.meta}>
                      <ExternalLinks
                        links={[...get(libraryData, 'content.demoLinks', []), externalDocsLink]}
                      />
                    </dd>
                  </Column>
                  <Button className={styles['versions-button']}>
                    View assets
                    <ArrowRight size={16} />
                  </Button>
                </Grid>
              </DashboardItem>
            </Column>
          </Dashboard>
        </Column>
      </Grid>
    </>
  )
}

Library.propTypes = {
  libraryData: libraryPropTypes,
  params: paramsPropTypes
}

export const getServerSideProps = async ({ params }) => {
  const libraryData = await getLibraryData(params)

  if (!libraryData) {
    return {
      notFound: true
    }
  }

  const navData = getLibraryNavData(params, libraryData)

  return {
    props: {
      libraryData,
      navData,
      params
    }
  }
}

export default Library
