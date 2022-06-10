/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Button, Column, Grid } from '@carbon/react'
import { ArrowRight } from '@carbon/react/icons'
import { Svg32Github, Svg32Library, Svg64Community } from '@carbon-platform/icons'
import clsx from 'clsx'
import { get } from 'lodash'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { useContext, useEffect } from 'react'
import { libraryPropTypes, paramsPropTypes, secondaryNavDataPropTypes } from 'types'

import { H2 } from '@/components/markdown'
import CardGroup from '@/components/card-group'
import { Dashboard, DashboardItem } from '@/components/dashboard'
import dashboardStyles from '@/components/dashboard/dashboard.module.scss'
import ExternalLinks from '@/components/external-links'
import MdxIcon from '@/components/mdx-icon'
import PageDescription from '@/components/page-description'
import PageHeader from '@/components/page-header'
import ResourceCard from '@/components/resource-card'
import { assetsNavData } from '@/data/nav-data'
import { teams } from '@/data/teams'
import { LayoutContext } from '@/layouts/layout'
import { getLibraryData, getLibraryNavData } from '@/lib/github'
import pageStyles from '@/pages/pages.module.scss'
import { getLicense } from '@/utils/schema'

import styles from './index.module.scss'

const Library = ({ libraryData, params, navData }) => {
  const { setPrimaryNavData, setSecondaryNavData } = useContext(LayoutContext)

  const router = useRouter()

  useEffect(() => {
    setPrimaryNavData(assetsNavData)
    setSecondaryNavData(navData)
  }, [setPrimaryNavData, navData, setSecondaryNavData])

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
  const SponsorIcon = teams[sponsor] ? teams[sponsor].pictogram : Svg64Community

  const assetsPath = `/assets/${params.library}/${params.ref}/library-assets`

  let externalDocsLink
  if (libraryData.content.externalDocsUrl) {
    externalDocsLink = {
      name: 'External docs',
      url: libraryData.content.externalDocsUrl
    }
  }

  const getVersion = () => {
    if (params.ref === 'main' || params.ref === 'master' || params.ref === 'latest') {
      return 'Latest'
    }

    return `v${libraryData.content.version}`
  }

  const libraryInheritanceCard = () => {
    const [library, version] = libraryData.content.inherits.split('@')
    return (
      <Column sm={4} md={4} lg={4}>
        <ResourceCard
          title={
            <div>
              {library} <br /> {version}
            </div>
          }
          subTitle="Inherits"
          href={`/assets/${library}/${version ?? ''}`}
          actionIcon="arrowRight"
        >
          <Svg32Library />
        </ResourceCard>
      </Column>
    )
  }

  return (
    <>
      <NextSeo {...seo} />
      <Grid>
        <Column sm={4} md={8} lg={12}>
          <PageHeader title={seo.title} />
        </Column>
        <Column sm={4} md={6} lg={8}>
          <PageDescription>{seo.description}</PageDescription>
        </Column>
        <Column sm={4} md={8} lg={12}>
          <Dashboard className={styles.dashboard}>
            <Column className={dashboardStyles.column} sm={4}>
              <DashboardItem aspectRatio={{ sm: '2x1', md: '1x1', lg: '3x4', xlg: '1x1' }}>
                <dl>
                  <dt className={dashboardStyles.label}>Version</dt>
                  <dd className={dashboardStyles['label--large']}>{getVersion()}</dd>
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
              <DashboardItem aspectRatio={{ sm: '1x1', lg: 'none', xlg: 'none' }}>
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
                  <Button
                    className={styles['versions-button']}
                    onClick={() => {
                      router.push(assetsPath)
                    }}
                  >
                    View assets
                    <ArrowRight size={16} />
                  </Button>
                </Grid>
              </DashboardItem>
            </Column>
          </Dashboard>
        </Column>
        <Column sm={4} md={8} lg={8}>
          <section>
            <H2>Resources</H2>

            <CardGroup>
              {libraryData.content.inherits && libraryInheritanceCard()}
              <Column sm={4} md={4} lg={4}>
                <ResourceCard
                  title={`${libraryData.params.org}/${libraryData.params.repo}`}
                  subTitle={libraryData.params.host === 'github.com' ? 'GitHub' : 'IBM GitHub'}
                  href={`https://${libraryData.params.host}/${libraryData.params.org}/${libraryData.params.repo}`}
                >
                  <Svg32Github />
                </ResourceCard>
              </Column>
              {!libraryData.content.private && (
                <Column sm={4} md={4} lg={4}>
                  <ResourceCard
                    title={libraryData.content.package}
                    subTitle="Package"
                    href={`https://npmjs.com/package/${libraryData.content.package}/v/${libraryData.content.version}`}
                  >
                    <MdxIcon name="npm" />
                  </ResourceCard>
                </Column>
              )}
            </CardGroup>
          </section>
        </Column>
      </Grid>
    </>
  )
}

Library.propTypes = {
  libraryData: libraryPropTypes,
  navData: secondaryNavDataPropTypes,
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
