/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid, Link as CarbonLink } from '@carbon/react'
import { ArrowRight } from '@carbon/react/icons'
import {
  StartDesigningArrow,
  StartDevArrow,
  Svg64Components,
  Svg64Functions,
  Svg64Patterns,
  Svg64Templates
} from '@carbon-platform/icons'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { useContext, useEffect } from 'react'

import ArtDirection from '@/components/art-direction'
import { Dashboard, DashboardItem } from '@/components/dashboard'
import dashboardStyles from '@/components/dashboard/dashboard.module.scss'
import Divider from '@/components/divider'
import { FeatureCard } from '@/components/feature-card/feature-card'
import Hero from '@/components/hero'
import { H2, P } from '@/components/markdown'
import { assetsNavData } from '@/data/nav-data'
import { LayoutContext } from '@/layouts/layout'

import ReactImgMax from './index/images/carbon-react_max-lg.png'
import ReactImgMd from './index/images/carbon-react_md.png'
import ReactImgSm from './index/images/carbon-react_sm.png'
import EcosystemImgMax from './index/images/ecosystem_max-md.png'
import EcosystemImgSm from './index/images/ecosystem_sm.png'
import DotComImgMax from './index/images/ibmdotcom_max-lg.png'
import DotComImgMd from './index/images/ibmdotcom_md.png'
import DotComImgSm from './index/images/ibmdotcom_sm.png'
import RoadmapMax from './index/images/roadmap_max-lg.png'
import RoadmapSm from './index/images/roadmap_sm.png'
import styles from './index/index.module.scss'

const PageContent = () => {
  return (
    <div className={styles.container}>
      <P className={styles['intro-paragraph']}>
        Carbon is IBM’s design system for digital experiences. The new website is your pathway to
        accessing components, patterns, functions, templates, and other assets across IBM.
        <br />↓
      </P>

      <Divider />

      <FeatureCard
        href="/about-carbon/how-carbon-works"
        title="How Carbon works"
        description="Learn more about the Carbon ecosystem."
      >
        <ArtDirection>
          <Image alt={'image'} src={EcosystemImgSm} layout="responsive" objectFit="cover" />
          <Image alt={'image'} src={EcosystemImgMax} layout="responsive" objectFit="cover" />
        </ArtDirection>
      </FeatureCard>

      <Divider>
        <Grid>
          <Column sm={4} md={2} lg={4}>
            <h2 className={clsx(styles['start-heading'], styles['start-heading--designing'])}>
              <Link href="/designing/get-started" passHref>
                <CarbonLink>
                  Start
                  <span>Designing</span>
                  <StartDesigningArrow />
                </CarbonLink>
              </Link>
            </h2>
          </Column>
          <Column sm={4} md={6} lg={7}>
            <P large>
              Learn how design kits are used to build consistent, scalable user interfaces — and get
              started with your design tool of choice, including Figma, Sketch, Adobe XD, or Axure.
            </P>
          </Column>
        </Grid>
      </Divider>
      <Divider>
        <Grid>
          <Column sm={4} md={2} lg={4}>
            <h2 className={clsx(styles['start-heading'], styles['start-heading--developing'])}>
              <Link href="/developing" passHref>
                <CarbonLink>
                  Start
                  <span>Developing</span>
                  <StartDevArrow />
                </CarbonLink>
              </Link>
            </h2>
          </Column>
          <Column sm={4} md={6} lg={7}>
            <P large>
              Learn about libraries and access everything you need to get up and running with your
              preferred framework — React, Angular, Web Components, Vue, or Svelte.
            </P>
          </Column>
        </Grid>
      </Divider>
      <Divider />

      <H2>Search asset catalogs</H2>
      <P>
        Asset catalogs allow you to search across all open and inner source resources and apply
        complex filters for any scenario — so that you can apply other teams’ knowledge to your own
        work.
      </P>

      <Dashboard>
        <Column className={dashboardStyles.column} sm={4} lg={6}>
          <DashboardItem
            href="/assets/components"
            aspectRatio={{ sm: '3x2', md: '4x3', lg: '3x2', xlg: '2x1' }}
          >
            <dl>
              <dt className={styles['dashboard-label']}>Components</dt>
              <dd className={styles['dashboard-content']}>
                Building blocks (such as buttons, links, and dropdown menus) that are pre-built and
                ready to use when creating new experiences.
              </dd>
            </dl>
            <Svg64Components className={styles['dashboard-icon']} />
            <ArrowRight
              className={clsx(dashboardStyles['position-bottom-right'], styles['dashboard-link'])}
              size={20}
            />
          </DashboardItem>
        </Column>
        <Column className={dashboardStyles.column} sm={4} lg={6}>
          <DashboardItem
            aspectRatio={{ sm: '3x2', md: '4x3', lg: '3x2', xlg: '2x1' }}
            href="/assets/patterns"
          >
            <dl>
              <dt className={styles['dashboard-label']}>Patterns</dt>
              <dd className={styles['dashboard-content']}>
                Reusable combinations of components and content with sequences and flows.
              </dd>
            </dl>
            <Svg64Patterns className={styles['dashboard-icon']} />
            <ArrowRight
              className={clsx(dashboardStyles['position-bottom-right'], styles['dashboard-link'])}
              size={20}
            />
          </DashboardItem>
        </Column>
        <Column className={dashboardStyles.column} sm={4} lg={6}>
          <DashboardItem
            aspectRatio={{ sm: '3x2', md: '4x3', lg: '3x2', xlg: '2x1' }}
            href="/assets/functions"
          >
            <dl>
              <dt className={styles['dashboard-label']}>Functions</dt>
              <dd className={styles['dashboard-content']}>
                Code that performs a single action and has no user interface.
              </dd>
            </dl>
            <Svg64Functions className={styles['dashboard-icon']} />
            <ArrowRight
              className={clsx(dashboardStyles['position-bottom-right'], styles['dashboard-link'])}
              size={20}
            />
          </DashboardItem>
        </Column>
        <Column className={dashboardStyles.column} sm={4} lg={6}>
          <DashboardItem
            aspectRatio={{ sm: '3x2', md: '4x3', lg: '3x2', xlg: '2x1' }}
            border={['sm', 'md', 'lg', 'xlg']}
            href="/assets/templates"
          >
            <dl>
              <dt className={styles['dashboard-label']}>Templates</dt>
              <dd className={styles['dashboard-content']}>
                Templates specify order and placement of patterns and components for a given
                scenario.
              </dd>
            </dl>
            <Svg64Templates className={styles['dashboard-icon']} />
            <ArrowRight
              className={clsx(dashboardStyles['position-bottom-right'], styles['dashboard-link'])}
              size={20}
            />
          </DashboardItem>
        </Column>
      </Dashboard>

      <H2>Try featured libraries</H2>
      <P>
        Libraries are the means to contribute, install, and use one or many assets. Explore the{' '}
        <Link href="/library" passHref>
          <CarbonLink size="lg">library catalog</CarbonLink>
        </Link>{' '}
        for all options.
      </P>

      <FeatureCard
        href="/libraries/carbon-react"
        title="Carbon React library"
        description="Build user interfaces with core components using Carbon's primary library."
      >
        <ArtDirection>
          <Image alt={'image'} src={ReactImgSm} layout="responsive" objectFit="cover" />
          <Image alt={'image'} src={ReactImgMd} layout="responsive" objectFit="cover" />
          <Image alt={'image'} src={ReactImgMax} layout="responsive" objectFit="cover" />
        </ArtDirection>
      </FeatureCard>
      <FeatureCard
        href="/libraries/ibmdotcom-web-components"
        title="IBM.com Web Components"
        description="Create web experiences that adhere to IBM's web standards using this primary component library."
      >
        <ArtDirection>
          <Image alt={'image'} src={DotComImgSm} layout="responsive" objectFit="cover" />
          <Image alt={'image'} src={DotComImgMd} layout="responsive" objectFit="cover" />
          <Image alt={'image'} src={DotComImgMax} layout="responsive" objectFit="cover" />
        </ArtDirection>
      </FeatureCard>

      <Divider />

      <P className={styles['intro-paragraph']}>
        By standardizing and surfacing our assets, the new site helps makers Find assets that{' '}
        <mark>comply</mark> with platform requirements, are <mark>convenient</mark> to implement,
        and are <mark>consistent</mark> with design patterns across the company.
        <br />↓
      </P>

      <Divider>
        <Grid>
          <Column sm={4} md={4} lg={4}>
            <H2>
              Better
              <br />
              discoverability
            </H2>
          </Column>
          <Column sm={4} md={4} lg={7}>
            <P large>
              <strong>For designers and developers:</strong>
              <br />A unified discovery experience helps designers and developers find and access
              components, patterns, and functions across all IBM teams.
            </P>
          </Column>
        </Grid>
      </Divider>
      <Divider>
        <Grid>
          <Column sm={4} md={4} lg={4}>
            <H2>
              Easier
              <br />
              management
            </H2>
          </Column>
          <Column sm={4} md={4} lg={7}>
            <P large>
              <strong>For contributors and maintainers:</strong>
              <br />A common schema helps PAL maintainers more easily manage their assets, keep
              content fresh in a live index, and add version control to their libraries.
            </P>
          </Column>
        </Grid>
      </Divider>
      <Divider />

      <H2>How PAL teams can prepare</H2>
      <P>
        Ensure your components, patterns, and functions are indexed in our unified asset discovery
        experience. To help you get started, our team will reach out to document your library’s
        metadata in the structured format we have provided.
      </P>
      <P>
        To make this happen, we ask that you follow the instructions below to document your
        library’s metadata in the structured format we have provided.
      </P>
      <P>
        <CarbonLink
          size="lg"
          className={styles.link}
          href="https://github.com/carbon-design-system/carbon-platform/blob/main/docs/resource-schemas.md#resource-schemas"
          renderIcon={ArrowRight}
        >
          Get started
        </CarbonLink>
      </P>
      <H2>Platform roadmap</H2>
      <P>
        Check out the{' '}
        <Link href="/about-carbon/platform-roadmap" passHref>
          <CarbonLink size="lg">platform roadmap</CarbonLink>
        </Link>{' '}
        to learn more about planned releases.
      </P>
      <Grid>
        <Column sm={4} md={8} lg={12}>
          <ArtDirection>
            <Image alt={'image'} src={RoadmapSm} layout="responsive" objectFit="cover" />
            <Image alt={'image'} src={RoadmapMax} layout="responsive" objectFit="cover" />
          </ArtDirection>
        </Column>
      </Grid>
    </div>
  )
}

const Index = () => {
  const { setPrimaryNavData } = useContext(LayoutContext)

  const seo = {
    title: 'Carbon Design System'
  }

  useEffect(() => {
    setPrimaryNavData(assetsNavData)
  }, [setPrimaryNavData])

  return (
    <>
      <NextSeo {...seo} />
      <Hero
        title="Build consistent & scalable experiences with confidence."
        section="homepage"
        theme="white"
      />
      <PageContent />
    </>
  )
}

export default Index
