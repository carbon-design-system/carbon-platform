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
import { assetsNavData } from '@/data/nav-data'
import { LayoutContext } from '@/layouts/layout'
import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

import ChartImg from './index/images/chart-banner.png'
import ReactImg from './index/images/react-banner.png'
import ReleaseOneImg from './index/images/roadmap-v0.1.png'
import ReleaseTwoImg from './index/images/roadmap-v0.2.png'
import ReleaseThreeImg from './index/images/roadmap-v1.0.png'
import ReleaseFourImg from './index/images/roadmap-v1.1.png'
import ReleaseFiveImg from './index/images/roadmap-v2.0.png'
import styles from './index/index.module.scss'

const PageContent = () => {
  const isLg = useMatchMedia(mediaQueries.lg)

  const highlights = [
    {
      header: 'Better discoverability',
      title: 'For designers and developers:',
      description:
        // eslint-disable-next-line max-len
        'A unified discovery experience helps designers and developers find and access components, patterns, functions and templates across all IBM teams.'
    },
    {
      header: 'Easier management',
      title: 'For contributors and maintainers:',
      description:
        // eslint-disable-next-line max-len
        'A common schema helps PAL maintainers more easily manage their assets, keep content fresh in a live index, and add version control to their libraries.'
    }
  ]

  const releases = [
    {
      version: 'v0.1',
      release: 'Released:',
      date: 'February 25',
      title: 'Standardize assets and libraries',
      description:
        // eslint-disable-next-line max-len
        'This private beta is the start to standardizing Carbon so we can bring everything together as one system. This release is focused on helping PAL maintainers classify libraries and assets through the application of a common schema. This release also prototypes asset discovery improvements as Carbon gets indexed through the application of the schema.',
      image: ReleaseOneImg,
      captionHeading: 'v0.1 User experience',
      caption:
        'Catalog assets link directly out to Carbon Design System and PAL sites to access an asset’s usage documentation.'
    },
    {
      version: 'v0.2',
      release: 'Released:',
      date: 'March 31',
      title: 'Asset catalog experience',
      description:
        // eslint-disable-next-line max-len
        'This release adds library and asset detail pages to surface the standardized content coming from the applied schema. All detail pages link out to the legacy Carbon and PAL websites for complete documentation while that additional content gets indexed into the system.',
      bulletPoints: [
        // eslint-disable-next-line max-len
        'Indexed Carbon Charts, Carbon Charts Angular, Carbon Charts React, Carbon Charts Svelte, Carbon Charts Vue, IBM.com React, and IBM.com Web Components libraries that are included in the catalogs',
        // eslint-disable-next-line max-len
        'Indexed IBM.com Services, IBM.com Styles, and IBM.com Utilities libraries that are excluded from the catalogs and will be surfaced in a v2 release local system',
        'New external docs and demo links, and open GitHub issue counts, in asset detail pages'
      ],
      image: ReleaseTwoImg,
      captionHeading: 'v0.2 User experience',
      caption:
        // eslint-disable-next-line max-len
        'Users can begin to access some library and asset docs without leaving the platform; however the user will still need to go offsite for more detailed usage documentation.'
    },
    {
      version: 'v1.0',
      release: 'Target release:',
      date: 'June',
      title: 'General availability',
      description:
        // eslint-disable-next-line max-len
        'The platform’s first major release will help system users discover and learn about all the assets and libraries in the system with confidence in their completeness, who maintains them, and how to use them. System users can access documentation for all indexed assets and libraries without leaving the platform.',
      bulletPoints: [
        'All legacy Carbon website content available in the site',
        'All open-source Carbon libraries indexed and available in the catalogs'
      ],
      image: ReleaseThreeImg,
      captionHeading: 'v1.0 User experience',
      caption:
        // eslint-disable-next-line max-len
        'This release replaces Carbon’s current website — all 32 “core” components will have complete asset detail pages.'
    },
    {
      version: 'v1.1',
      release: 'Target release:',
      date: 'July',
      title: 'Explore with confidence',
      subtitle: 'This release will fully take the following Hill 1A:',
      description:
        // eslint-disable-next-line max-len
        'An IBM Maker [designers, developers, product managers delivering to the IBM ecosystem] can discover and learn about resources [standards and components/patterns] in the system with confidence in their completeness, who maintains them and where they’re used.',
      bulletPoints: [
        'New login capabilities to view IBM internal content',
        'New standards added to the site',
        'IBM internal Carbon libraries indexed and available in the catalogs upon logging in'
      ],
      image: ReleaseFourImg,
      captionHeading: 'v1.1 User experience',
      caption:
        // eslint-disable-next-line max-len
        'In this release standards content will be available on the platform and IBM internal libraries will be discoverable after logging in.'
    },
    {
      version: 'v2.0',
      release: 'Target release:',
      date: 'Q3 2022',
      title: 'System of systems',
      subtitle: 'The platform’s second major release will take the following Hills 1B and 1C:',
      description: '',
      descriptionBlock: [
        {
          title: 'Contribute with ease',
          description:
            // eslint-disable-next-line max-len
            'An IBM Maker [designers, developers, product managers delivering to the IBM ecosystem] can create, document, share new resources [standards and components/patterns] to the system without Design Program Office (DPO) involvement or coding a documentation website.'
        },
        {
          title: 'Team experience',
          description:
            // eslint-disable-next-line max-len
            'An IBM Maker [designers, developers, product managers delivering to the IBM ecosystem] can consume any applicable and versioned resources [standards and components/patterns] for their team, in a single, curated experience.'
        }
      ],
      bulletPointsHeader: 'This evolves the platform into a system of systems, with:',
      bulletPoints: [
        'Pattern and Asset Library (PAL) sites migrated as local systems',
        'PAL sites sunset with redirects to Carbon’s website',
        'Resource cross-linking among standards, libraries, assets',
        'Visual content authoring experience with less reliance on markdown',
        'New code package and component usage analytics'
      ],
      image: ReleaseFiveImg,
      captionHeading: 'v2.0 User experience',
      caption:
        // eslint-disable-next-line max-len
        'In this release, all external docs content has been fully migrated allowing the PALs to sunset. The team switcher will allow teams to view assets and documenation through the lens of their team.'
    }
  ]

  return (
    <div className={styles.container}>
      <div className={styles.highlights}>
        <Grid className={styles.hightlightGrid}>
          <Column sm={4} md={8} lg={8} xlg={7}>
            <h2 className={styles.subheading}>
              The new Carbon Design System provides a single place to find and use all open and
              inner source assets teams need to build consistent, scalable experiences with
              confidence.
            </h2>
          </Column>
        </Grid>
        {highlights.map((highlight, i) => (
          <Grid
            className={clsx(styles.hightlightGrid, styles.hightlightGridHeight, styles.border)}
            key={i}
          >
            <Column sm={4} key={i}>
              <h3 className={clsx(styles.highlightHeading, styles.highlightHeadingBig)}>
                {highlight.header}
              </h3>
            </Column>
            <Column sm={4} lg={8} xlg={7}>
              <p className={styles.highlightDescription}>
                <span className={styles.highlightTitle}>{highlight.title}</span>
                {highlight.description}
              </p>
            </Column>
          </Grid>
        ))}
      </div>
      <Grid className={styles.hightlightGrid}>
        <Column sm={4} md={8} lg={8} xlg={7}>
          <p className={clsx(styles.subheadingMedium)}>
            The <strong>asset discovery experience</strong> is your efficient pathway to accessing
            components, patterns, functions, templates, and other re-usable resources across all IBM
            teams.
          </p>
        </Column>
      </Grid>
      <Grid className={styles.hightlightGrid}>
        <Column sm={4} md={8} lg={8} xlg={7}>
          <h2 className={clsx(styles.subheading, styles.subheadingNoPadding)}>Asset catalog</h2>
          <p className={styles.subheadingContent}>
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
                border={['sm', 'md', 'lg', 'xlg']}
              >
                <dl>
                  <dt className={styles.dashboardLabel}>Components</dt>
                  <dd className={styles.dashboardContent}>
                    Building blocks (such as buttons, links, and dropdown menus) that are pre-built
                    and ready to use when creating new experiences.
                  </dd>
                </dl>
                {!isLg && <Svg48Components className={styles.dashboardIcon} />}
                {isLg && <Svg64Components className={styles.dashboardIcon} />}
                <ArrowRight
                  className={clsx(dashboardStyles.positionBottomRight, styles.dashboardLink)}
                  size={20}
                />
              </DashboardItem>
            </Column>
            <Column className={dashboardStyles.column} sm={4} lg={6}>
              <DashboardItem
                aspectRatio={{ sm: '3x2', md: '4x3', lg: '3x2', xlg: '2x1' }}
                border={['sm', 'md', 'lg', 'xlg']}
                href="/assets/patterns"
              >
                <dl>
                  <dt className={styles.dashboardLabel}>Patterns</dt>
                  <dd className={styles.dashboardContent}>
                    Reusable combinations of components and content with sequences and flows.
                  </dd>
                </dl>
                {!isLg && <Svg48Patterns className={styles.dashboardIcon} />}
                {isLg && <Svg64Patterns className={styles.dashboardIcon} />}
                <ArrowRight
                  className={clsx(dashboardStyles.positionBottomRight, styles.dashboardLink)}
                  size={20}
                />
              </DashboardItem>
            </Column>
            <Column className={dashboardStyles.column} sm={4} lg={6}>
              <DashboardItem
                aspectRatio={{ sm: '3x2', md: '4x3', lg: '3x2', xlg: '2x1' }}
                border={['sm', 'md', 'lg', 'xlg']}
                href="/assets/functions"
              >
                <dl>
                  <dt className={styles.dashboardLabel}>Functions</dt>
                  <dd className={styles.dashboardContent}>
                    Code that performs a single action and has no user interface.
                  </dd>
                </dl>
                {!isLg && <Svg48Functions className={styles.dashboardIcon} />}
                {isLg && <Svg64Functions className={styles.dashboardIcon} />}
                <ArrowRight
                  className={clsx(dashboardStyles.positionBottomRight, styles.dashboardLink)}
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
                  <dt className={styles.dashboardLabel}>Templates</dt>
                  <dd className={styles.dashboardContent}>
                    Templates specify order and placement of patterns and components for a given
                    scenario.
                  </dd>
                </dl>
                {!isLg && <Svg48Templates className={styles.dashboardIcon} />}
                {isLg && <Svg64Templates className={styles.dashboardIcon} />}
                <ArrowRight
                  className={clsx(dashboardStyles.positionBottomRight, styles.dashboardLink)}
                  size={20}
                />
              </DashboardItem>
            </Column>
          </Dashboard>
        </Column>
      </Grid>
      <Grid className={styles.hightlightGrid}>
        <Column sm={4} md={8} lg={8} xlg={7}>
          <h2 className={clsx(styles.subheading, styles.subheadingNoPadding)}>Asset collections</h2>
          <p className={styles.subheadingContent}>
            Collections allow you to explore curated lists of assets, like a playlist, so that you
            can easily locate your relevant resources when you come back.
          </p>
        </Column>
      </Grid>
      <FeatureCard
        href="/assets/data-visualization"
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
      <Grid className={styles.hightlightGrid}>
        <Column sm={4} md={8} lg={8} xlg={7}>
          <h2 className={clsx(styles.subheading, styles.subheadingNoPadding)}>
            Featured libraries
          </h2>
          <p className={styles.subheadingContent}>
            Libraries are the means to contribute, install, and use one or many assets in products
            and digital experiences.
          </p>
        </Column>
      </Grid>
      <FeatureCard
        href="/assets/libraries"
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
      <Grid className={clsx(styles.hightlightGrid, styles.border)}>
        <Column sm={4} md={8} lg={8} xlg={7}>
          <p className={clsx(styles.subheadingLarge)}>
            By standardizing our assets and surfacing them, we can help our makers find assets that{' '}
            <strong>comply</strong> with platform requirements, are <strong>convenient</strong> to
            implement, and are <strong>consistent</strong> with design patterns across the company.
          </p>
        </Column>
      </Grid>
      <Grid>
        <Column sm={4} md={8} className={styles.contentColumn}>
          <h2 className={styles.contentHeading}>How PAL teams can prepare</h2>
          <p className={styles.contentCopy}>
            Ensure your components, patterns, and functions are indexed in our unified asset
            discovery experience. To help you get started, our team will reach out to document your
            library’s metadata in the structured format we have provided.
          </p>
          <p className={styles.contentCopy}>
            To make this happen, we ask that you follow the instructions below to document your
            library’s metadata in the stuctured format we have provided.
          </p>
          <div className={styles.contentCopy}>
            <Link
              className={styles.link}
              href="https://github.com/carbon-design-system/carbon-platform/blob/main/docs/resource-schemas.md#resource-schemas"
              renderIcon={ArrowRight}
            >
              Get started
            </Link>
          </div>
          <h2 className={styles.contentHeading}>Platform roadmap</h2>
          <p className={styles.contentCopy}>
            Progress on the following releases are documented in{' '}
            <Link
              className={styles.link}
              href="https://github.com/carbon-design-system/carbon-platform"
            >
              GitHub
            </Link>
            , along with milestones, estimated dates, and descriptions of high level outcomes. For a
            visual overview of the following releases and their epics, view our roadmap in{' '}
            <Link className={styles.link} href="https://airtable.com/shrshl3XOeeT4Uxq0">
              Airtable
            </Link>
            .
          </p>
        </Column>
      </Grid>
      {releases.map((release, i) => (
        <Grid className={clsx(styles.release, styles.border)} key={i}>
          <Column sm={4} md={8} lg={4}>
            <h2 className={styles.releaseHeading}>
              <div className={styles.bold}>{release.version}</div>
              <div>{release.release}</div>
              <div>{release.date}</div>
            </h2>
          </Column>
          <Column sm={4} md={8}>
            <div className={styles.releaseContent}>
              {release.title && <h3 className={styles.releaseSubheading}>{release.title}</h3>}
              {release.subtitle && <p className={styles.releaseCopy}>{release.subtitle}</p>}
              {release.description && <p className={styles.releaseCopy}>{release.description}</p>}
              {release.descriptionBlock &&
                release.descriptionBlock.map((descriptionBlock, o) => (
                  <div className={styles.releaseCopy} key={o}>
                    <p>{descriptionBlock.title}</p>
                    <p>{descriptionBlock.description}</p>
                  </div>
                ))}
              {release.bulletPointsHeader && (
                <p className={styles.releaseCopy}>{release.bulletPointsHeader}</p>
              )}
              {release.bulletPoints && (
                <ul className={styles.releaseCopy}>
                  {release.bulletPoints.map((bulletPoint, e) => {
                    return <li key={e}>{'– ' + bulletPoint}</li>
                  })}
                </ul>
              )}
            </div>
            <div className={styles.releaseImage}>
              <Image
                alt={release.captionHeading}
                layout="responsive"
                src={release.image}
                placeholder="blur"
              />
              <p className={styles.releaseImageCaption}>
                <span className={styles.bold}>{release.captionHeading}:</span> {release.caption}
              </p>
            </div>
          </Column>
        </Grid>
      ))}
    </div>
  )
}

const Index = () => {
  const { setNavData } = useContext(LayoutContext)

  const seo = {
    title: 'Assets'
  }

  useEffect(() => {
    setNavData(assetsNavData)
  }, [setNavData])

  return (
    <>
      <NextSeo {...seo} />
      <Hero title="Find assets across teams—and build with confidence." section="assets" />
      <PageContent />
    </>
  )
}

export default Index
