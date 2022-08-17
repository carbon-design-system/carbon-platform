/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid, Link as CarbonLink } from '@carbon/react'
import { ArrowRight } from '@carbon/react/icons'
import {
  Svg48Components,
  Svg48Functions,
  Svg48Patterns,
  Svg48Templates,
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

import { Dashboard, DashboardItem } from '@/components/dashboard'
import dashboardStyles from '@/components/dashboard/dashboard.module.scss'
import Divider from '@/components/divider'
import { FeatureCard } from '@/components/feature-card/feature-card'
import Hero from '@/components/hero'
import { H2, P } from '@/components/markdown'
import { assetsNavData } from '@/data/nav-data'
import { LayoutContext } from '@/layouts/layout'
import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

import ChartImg from './index/images/chart-banner.png'
import ReactImg from './index/images/react-banner.png'
import styles from './index/index.module.scss'

const PageContent = () => {
  const isLg = useMatchMedia(mediaQueries.lg)

  return (
    <div className={styles.container}>
      <H2>
        Carbon is IBM’s design system for digital experiences. The new website is your pathway to
        accessing components, patterns, functions, templates, and other assets across IBM.
        <br />↓
      </H2>

      <Divider />

      <FeatureCard
        href="/libraries/carbon-react"
        title="How Carbon works"
        description="Learn more about the Carbon ecosystem."
      >
        <Image
          alt={'image'}
          src={ReactImg}
          layout={isLg ? 'responsive' : 'fill'}
          objectFit="cover"
        />
      </FeatureCard>

      <Divider>
        <Grid>
          <Column sm={4} md={2} lg={4}>
            <H2>
              Start
              <br />
              Designing
            </H2>
          </Column>
          <Column sm={4} md={6} lg={7}>
            <P>
              Learn how design kits are used to build consistent, scalable user interfaces — and get
              started with your design tool of choice — Figma, Sketch, Adobe Xd.
            </P>
          </Column>
        </Grid>
      </Divider>
      <Divider>
        <Grid>
          <Column sm={4} md={2} lg={4}>
            <H2>
              Start
              <br />
              Developing
            </H2>
          </Column>
          <Column sm={4} md={6} lg={7}>
            <P>
              Learn about libraries and access everything you need to get up and running with your
              framework from the various choices available in Carbon — React, Angular, Web
              components, and Vue.
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
            {!isLg && <Svg48Components className={styles['dashboard-icon']} />}
            {isLg && <Svg64Components className={styles['dashboard-icon']} />}
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
            {!isLg && <Svg48Patterns className={styles['dashboard-icon']} />}
            {isLg && <Svg64Patterns className={styles['dashboard-icon']} />}
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
            {!isLg && <Svg48Functions className={styles['dashboard-icon']} />}
            {isLg && <Svg64Functions className={styles['dashboard-icon']} />}
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
            {!isLg && <Svg48Templates className={styles['dashboard-icon']} />}
            {isLg && <Svg64Templates className={styles['dashboard-icon']} />}
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
          <CarbonLink size="lg">library</CarbonLink>
        </Link>{' '}
        catalog for all options.
      </P>

      <FeatureCard
        href="/libraries/carbon-react"
        title="Carbon React library"
        description="A library of reusable React components to build websites and user interfaces."
      >
        <Image
          alt={'image'}
          src={ReactImg}
          layout={isLg ? 'responsive' : 'fill'}
          objectFit="cover"
        />
      </FeatureCard>
      <FeatureCard
        href="/libraries/ibmdotcom-web-components"
        title="IBM.com Web Components"
        description="A library of reusable React components to build websites and user interfaces."
      >
        <Image
          alt={'image'}
          src={ChartImg}
          layout={isLg ? 'responsive' : 'fill'}
          objectFit="cover"
        />
      </FeatureCard>

      <H2>
        By standardizing and surfacing our assets, the new site helps makers Find assets that{' '}
        <em>comply</em> with platform requirements, are <em>convenient</em> to implement, and are{' '}
        <em>consistent</em> with design patterns across the company.
        <br />↓
      </H2>

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
      <Hero title="Build consistent & scalable experiences with confidence." section="homepage" />
      <PageContent />
    </>
  )
}

export default Index
