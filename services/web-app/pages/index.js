/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid, Link } from '@carbon/react'
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
import { NextSeo } from 'next-seo'
import { useContext, useEffect } from 'react'

import { Dashboard, DashboardItem } from '@/components/dashboard'
import dashboardStyles from '@/components/dashboard/dashboard.module.scss'
import { FeatureCard } from '@/components/feature-card/feature-card'
import Hero from '@/components/hero'
import H2 from '@/components/markdown/h2'
import { assetsNavData } from '@/data/nav-data'
import { LayoutContext } from '@/layouts/layout'
import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

import ChartImg from './index/images/chart-banner.png'
import ReactImg from './index/images/react-banner.png'
import styles from './index/index.module.scss'

const PageContent = () => {
  const isLg = useMatchMedia(mediaQueries.lg)

  const highlights = [
    {
      header: 'Better discoverability',
      title: 'For designers and developers:',
      description:
        'A unified discovery experience helps designers and developers find and access ' +
        'components, patterns, functions and templates across all IBM teams.'
    },
    {
      header: 'Easier management',
      title: 'For contributors and maintainers:',
      description:
        'A common schema helps PAL maintainers more easily manage their assets, keep content ' +
        'fresh in a live index, and add version control to their libraries.'
    }
  ]

  return (
    <div className={styles.container}>
      <div className={styles.highlights}>
        <Grid className={styles['highlight-grid']}>
          <Column sm={4} md={8} lg={8} xlg={7}>
            <H2 className={styles['h2-container']} headingClassName={styles.subheading}>
              The new Carbon Design System provides a single place to find and use all open and
              inner source assets teams need to build consistent, scalable experiences with
              confidence.
            </H2>
          </Column>
        </Grid>
        {highlights.map((highlight, i) => (
          <Grid
            className={clsx(
              styles['highlight-grid'],
              styles['highlight-grid--height'],
              styles.border
            )}
            key={i}
          >
            <Column sm={4} key={i}>
              <h3 className={clsx(styles['highlight-heading'], styles['highlight-heading--big'])}>
                {highlight.header}
              </h3>
            </Column>
            <Column sm={4} lg={8} xlg={7}>
              <p className={styles['highlight-description']}>
                <span className={styles['highlight-title']}>{highlight.title}</span>
                {highlight.description}
              </p>
            </Column>
          </Grid>
        ))}
      </div>
      <Grid className={styles['highlight-grid']}>
        <Column sm={4} md={8} lg={8} xlg={7}>
          <p className={clsx(styles['subheading-medium'])}>
            The <strong>asset discovery experience</strong> is your efficient pathway to accessing
            components, patterns, functions, templates, and other re-usable resources across all IBM
            teams.
          </p>
        </Column>
      </Grid>
      <Grid className={styles['highlight-grid']}>
        <Column sm={4} md={8} lg={8} xlg={7}>
          <H2 className={styles['h2-container']}>Asset catalogs</H2>
          <p className={styles['subheading-content']}>
            Asset catalogs allow you to search across all open and inner source resources and apply
            complex filters for any scenario—so that you can apply other teams’ knowledge to your
            own work.
          </p>
        </Column>
      </Grid>
      <Grid className={styles.dashboard}>
        <Column sm={4} md={8} lg={{ start: 1, span: 12 }}>
          <Dashboard>
            <Column className={dashboardStyles.column} sm={4} lg={6}>
              <DashboardItem
                href="/assets/components"
                aspectRatio={{ sm: '3x2', md: '4x3', lg: '3x2', xlg: '2x1' }}
              >
                <dl>
                  <dt className={styles['dashboard-label']}>Components</dt>
                  <dd className={styles['dashboard-content']}>
                    Building blocks (such as buttons, links, and dropdown menus) that are pre-built
                    and ready to use when creating new experiences.
                  </dd>
                </dl>
                {!isLg && <Svg48Components className={styles['dashboard-icon']} />}
                {isLg && <Svg64Components className={styles['dashboard-icon']} />}
                <ArrowRight
                  className={clsx(
                    dashboardStyles['position-bottom-right'],
                    styles['dashboard-link']
                  )}
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
                  className={clsx(
                    dashboardStyles['position-bottom-right'],
                    styles['dashboard-link']
                  )}
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
                  className={clsx(
                    dashboardStyles['position-bottom-right'],
                    styles['dashboard-link']
                  )}
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
                  className={clsx(
                    dashboardStyles['position-bottom-right'],
                    styles['dashboard-link']
                  )}
                  size={20}
                />
              </DashboardItem>
            </Column>
          </Dashboard>
        </Column>
      </Grid>
      <Grid className={styles['highlight-grid']}>
        <Column sm={4} md={8} lg={8} xlg={7}>
          <H2 className={styles['h2-container']}>Asset collections</H2>
          <p className={styles['subheading-content']}>
            Collections allow you to explore curated lists of assets, like a playlist, so that you
            can easily locate your relevant resources when you come back.
          </p>
        </Column>
      </Grid>
      <FeatureCard
        href="/data-visualization"
        title="Data visualization"
        description="A collection of reusable charting components to build websites and user interfaces."
      >
        <Image
          alt={'image'}
          src={ChartImg}
          layout={isLg ? 'responsive' : 'fill'}
          objectFit="cover"
        />
      </FeatureCard>
      <Grid className={styles['highlight-grid']}>
        <Column sm={4} md={8} lg={8} xlg={7}>
          <H2 className={clsx(styles['h2-container'], styles['no-padding'])}>Featured libraries</H2>
          <p className={styles['subheading-content']}>
            Libraries are the means to contribute, install, and use one or many assets in products
            and digital experiences.
          </p>
        </Column>
      </Grid>
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
      <Grid className={clsx(styles['highlight-grid'], styles.border)}>
        <Column sm={4} md={8} lg={8} xlg={7}>
          <p className={clsx(styles['subheading-large'])}>
            By standardizing our assets and surfacing them, we can help our makers find assets that{' '}
            <strong>comply</strong> with platform requirements, are <strong>convenient</strong> to
            implement, and are <strong>consistent</strong> with design patterns across the company.
          </p>
        </Column>
      </Grid>
      <Grid>
        <Column sm={4} md={8} className={styles['content-column']}>
          <H2>How PAL teams can prepare</H2>
          <p className={styles['content-copy']}>
            Ensure your components, patterns, and functions are indexed in our unified asset
            discovery experience. To help you get started, our team will reach out to document your
            library’s metadata in the structured format we have provided.
          </p>
          <p className={styles['content-copy']}>
            To make this happen, we ask that you follow the instructions below to document your
            library’s metadata in the structured format we have provided.
          </p>
          <div className={styles['content-copy']}>
            <Link
              className={styles.link}
              href="https://github.com/carbon-design-system/carbon-platform/blob/main/docs/resource-schemas.md#resource-schemas"
              renderIcon={ArrowRight}
            >
              Get started
            </Link>
          </div>
        </Column>
      </Grid>
    </div>
  )
}

const Index = () => {
  const { setPrimaryNavData } = useContext(LayoutContext)

  const seo = {
    title: 'Assets'
  }

  useEffect(() => {
    setPrimaryNavData(assetsNavData)
  }, [setPrimaryNavData])

  return (
    <>
      <NextSeo {...seo} />
      <Hero title="Find assets across teams—and build with confidence." section="assets" />
      <PageContent />
    </>
  )
}

export default Index
