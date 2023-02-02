/*
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Button, ButtonSet, Column, Grid, Link as CarbonLink } from '@carbon/react'
import { ArrowRight, Launch } from '@carbon/react/icons'
import { Svg32Github, Svg32Library, Svg64Community } from '@carbon-platform/icons'
import {
  AnchorLink,
  AnchorLinks,
  CardGroup,
  H2,
  PageDescription,
  ResourceCard
} from '@carbon-platform/mdx-components'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { useContext, useEffect } from 'react'

import ContentWrapper from '@/components/content-wrapper'
import { Dashboard, DashboardItem } from '@/components/dashboard'
import dashboardStyles from '@/components/dashboard/dashboard.module.scss'
import DemoLinks from '@/components/demo-links'
import MdxIcon from '@/components/mdx-icon'
import PageHeader from '@/components/page-header'
import withLoading from '@/components/with-loading'
import { assetsNavData } from '@/data/nav-data'
import { pageHeaders } from '@/data/page-headers'
import { teams } from '@/data/teams'
import { LayoutContext } from '@/layouts/layout'
import {
  getLibraryData,
  getLibraryNavData,
  getLibraryParams,
  getLibraryRelatedLibs
} from '@/lib/github'
import { libraryPropTypes, paramsPropTypes, secondaryNavDataPropTypes } from '@/types'
import {
  getAssetLicense,
  getLibraryDisplayNameVersion,
  getLibraryDisplayVersion
} from '@/utils/schema'

import styles from './index.module.scss'

const Library = ({ libraryData, params, navData }) => {
  const { setPrimaryNavData, setSecondaryNavData } = useContext(LayoutContext)
  const router = useRouter()

  const pageHeader = pageHeaders?.library ?? {}
  const { name, description, otherLibraries: relatedLibraries } = libraryData.content
  const libraryVersion = getLibraryDisplayVersion(libraryData)

  /**
   * Paths
   */

  const assetsPath = `/libraries/${params.library}/${params.ref}/assets`
  const designKitPath = `/libraries/${params.library}/${params.ref}/design-kits`

  /**
   * SEO
   */

  const seo = {
    title: getLibraryDisplayNameVersion(libraryData),
    description
  }

  /**
   * Maintainers
   */

  const { maintainer } = libraryData.params
  const MaintainerIcon = teams[maintainer] ? teams[maintainer].pictogram : Svg64Community

  /**
   * Nav data
   */

  useEffect(() => {
    setPrimaryNavData(assetsNavData)
    setSecondaryNavData(navData)
  }, [setPrimaryNavData, navData, setSecondaryNavData])

  /**
   * Local components
   */

  const renderInheritanceCard = () => {
    const inherits = libraryData?.content?.inherits

    if (!inherits) return null

    const [library, version] = inherits.split('@')

    return (
      <Column sm={4} md={4} lg={4}>
        <ResourceCard
          title={
            <div>
              {libraryData.content.inheritedLib?.content?.name ?? library} <br /> {version}
            </div>
          }
          subTitle="Inherits"
          href={`/libraries/${library}/${version ?? ''}`}
          actionIcon="arrowRight"
        >
          <Svg32Library />
        </ResourceCard>
      </Column>
    )
  }

  const renderRelatedLibrariesLinks = relatedLibraries
    .sort((a, b) => a.content.name.localeCompare(b.content.name))
    .map((item, index) => (
      <>
        {index !== 0 && ', '}
        <CarbonLink size="lg" href={`/libraries/${item.params.library}`}>
          {item.content.name}
        </CarbonLink>
      </>
    ))

  return (
    <>
      <NextSeo {...seo} />
      <Grid>
        <Column sm={4} md={8} lg={12}>
          <PageHeader bgColor={pageHeader?.bgColor} title={name} pictogram={pageHeader?.icon} />
        </Column>
      </Grid>
      <ContentWrapper>
        <Grid>
          <Column sm={4} md={8} lg={8}>
            <PageDescription className={styles['page-description']}>
              {seo.description}
            </PageDescription>
            <AnchorLinks>
              <AnchorLink>Dashboard</AnchorLink>
              {libraryData.content.demoLinks && <AnchorLink>Demo links</AnchorLink>}
              <AnchorLink>Resources</AnchorLink>
            </AnchorLinks>
          </Column>
          <Column sm={4} md={8} lg={12}>
            <div id="dashboard">
              <Dashboard className={styles.dashboard}>
                <Column className={dashboardStyles.column} sm={4}>
                  <DashboardItem aspectRatio={{ sm: '2x1', md: '1x1', lg: '3x4', xlg: '1x1' }}>
                    <dl>
                      <dt className={dashboardStyles.label}>Version</dt>
                      <dd className={dashboardStyles['label--large']}>{libraryVersion}</dd>
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
                          {teams[libraryData.params.maintainer]?.name || 'Community'}
                        </dd>
                      </Column>
                      <Column className={dashboardStyles.subcolumn} sm={2} lg={4}>
                        <dt className={dashboardStyles.label}>License</dt>
                        <dd className={dashboardStyles.meta}>{getAssetLicense(libraryData)}</dd>
                      </Column>
                      <Column className={dashboardStyles.subcolumn} sm={2} lg={4}>
                        <dt className={dashboardStyles.label}>Related libraries</dt>
                        <dd className={dashboardStyles.meta}>
                          {relatedLibraries.length > 0 ? renderRelatedLibrariesLinks : '–'}
                        </dd>
                      </Column>
                      <Column className={dashboardStyles.subcolumn} sm={2} lg={4}>
                        <dt className={dashboardStyles.label}>Design files</dt>
                        <dd className={dashboardStyles.meta}>
                          <CarbonLink size="lg" href={designKitPath}>
                            View compatible kits
                          </CarbonLink>
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
                        href={libraryData.content.externalDocsUrl}
                      >
                        View library docs
                        <Launch size={16} />
                      </Button>
                    </ButtonSet>
                  </DashboardItem>
                </Column>
              </Dashboard>
            </div>
          </Column>
          {libraryData.content.demoLinks && (
            <Column sm={4} md={8} lg={8}>
              <section>
                <H2>Demo links</H2>
                <DemoLinks links={libraryData?.content?.demoLinks || []} />
              </section>
            </Column>
          )}
          <Column sm={4} md={8} lg={8}>
            <section>
              <H2>Resources</H2>
              <CardGroup>
                {renderInheritanceCard()}
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
      </ContentWrapper>
    </>
  )
}

Library.propTypes = {
  libraryData: libraryPropTypes,
  navData: secondaryNavDataPropTypes,
  params: paramsPropTypes
}

export const getStaticProps = async ({ params }) => {
  const libraryData = await getLibraryData(params)

  if (!libraryData) {
    return {
      notFound: true
    }
  }
  const navData = getLibraryNavData(params, libraryData)

  if (libraryData.content.inherits) {
    const inheritedLibParams = await getLibraryParams(libraryData.content.inherits)
    if (inheritedLibParams) {
      const inheritedLib = await getLibraryData(inheritedLibParams)
      if (inheritedLib) {
        libraryData.content.inheritedLib = inheritedLib
      }
    }
  }

  libraryData.content.otherLibraries = await getLibraryRelatedLibs(libraryData)

  return {
    props: {
      libraryData,
      navData,
      params
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every hour
    revalidate: 60 * 60 // In seconds
  }
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true
  }
}

export default withLoading(Library, {
  pageHeader: { bgColor: pageHeaders?.library?.bgColor }
})
