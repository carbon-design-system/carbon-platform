/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid, Link } from '@carbon/react'
import { ArrowRight } from '@carbon/react/icons'
import clsx from 'clsx'
import Image from 'next/image'
import { NextSeo } from 'next-seo'
import { useContext, useEffect } from 'react'

import Hero from '@/components/hero'
import { assetsNavData } from '@/data/nav-data'
import { LayoutContext } from '@/layouts/layout'

import ReleaseOneImg from './index/images/carbon-next-v0.1.png'
import ReleaseTwoImg from './index/images/carbon-next-v0.2.png'
import ReleaseThreeImg from './index/images/carbon-next-v1.0.png'
import ReleaseFourImg from './index/images/carbon-next-v1.1.png'
import ReleaseFiveImg from './index/images/carbon-next-v2.0.png'
import HeroImg from './index/images/hero-illo.png'
import styles from './index/index.module.scss'

const PageContent = () => {
  const pageHighlights = [
    {
      header: 'Better discoverability',
      title: 'For designers and developers:',
      description:
        'A unified discovery experience will help designers and developers find and access components, patterns, and functions across all IBM teams.'
    },
    {
      header: 'Easier management',
      title: 'For contributors and maintainers:',
      description:
        // eslint-disable-next-line max-len
        'A common schema will help PAL maintainers more easily manage their assets, keep content fresh in a live index, and add version control to their libraries.'
    }
  ]

  const pageVersionReleases = [
    {
      version: 'v0.1',
      targetRelease: 'Target release:',
      date: 'February 27',
      title: 'Standardize assets and libraries',
      description:
        // eslint-disable-next-line max-len
        'This private beta is the start to standardizing Carbon so we can bring everything together as one system. This release is focused on helping PAL maintainers classify libraries and assets through the application of a common schema. This release also prototypes asset discovery improvements as Carbon gets indexed through the application of the schema.',
      image: ReleaseOneImg,
      imageTitle: 'v0.1 User experience:',
      imageDescription:
        'Catalog assets link directly out to Carbon Design System and PAL sites to access an asset’s usage documentation.'
    },
    {
      version: 'v0.2',
      targetRelease: 'Target release:',
      date: 'March 27',
      title: 'For contributors and maintainers:',
      description:
        // eslint-disable-next-line max-len
        'A common schema will help PAL maintainers more easily manage their assets, keep content fresh in a live index, and add version control to their libraries.',
      image: ReleaseTwoImg,
      imageTitle: 'v0.2 User experience:',
      imageDescription:
        // eslint-disable-next-line max-len
        'Users can begin to access some library and asset docs without leaving the platform; however the user will still need to go offsite for more detailed usage documentation.'
    },
    {
      version: 'v1.0',
      targetRelease: 'Target release:',
      date: 'May 9',
      title: 'General availability',
      description:
        // eslint-disable-next-line max-len
        "The platform's first major release will help system users discover and learn about all the assets and libraries in the system with confidence in their completeness, who maintains them, and how to use them. System users can access documentation for all indexed assets and libraries without leaving the platform.",
      bulletPoints: [
        'New login capabilities to view IBM internal content',
        'Global asset catalog no longer uses external links to legacy docs sites'
      ],
      image: ReleaseThreeImg,
      imageTitle: 'v1.0 User experience:',
      imageDescription:
        // eslint-disable-next-line max-len
        'This release replaces Carbon’s current website — all 32 “core” components will have fleshed out asset detail pages. If a PAL has migrated content, then it will begin to remove its external docs urls to leverage the detail pages. User Log in will be fully integrated into the experience as well.'
    },
    {
      version: 'v1.1',
      targetRelease: 'Target release:',
      date: 'June',
      title: 'Explore with confidence',
      subtitle: 'This release will fully take the following Hill:',
      description:
        // eslint-disable-next-line max-len
        "An IBM Maker [designers, developers, product managers delivering to the IBM ecosystem] can discover and learn about resources [standards and components/patterns] in the system with confidence in their completeness, who maintains them and where they're used.",
      bulletPoints: [
        'New standards added to the site',
        'New code package and component usage analytics'
      ],
      image: ReleaseFourImg,
      imageTitle: 'v1.1 User experience:',
      imageDescription:
        // eslint-disable-next-line max-len
        'In this release Standards content will be available on the platform and component usage analytics will allow us to track component insertions.'
    },
    {
      version: 'v2.0',
      targetRelease: 'Target release:',
      date: 'Q3',
      title: 'System of systems',
      subtitle: "The platform's second major release will take the following Hills:",
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
        "PAL sites sunset with redirects to Carbon's website",
        'Resource cross-linking among standards, libraries, assets',
        'Visual content authoring experience with less reliance on markdown'
      ],
      image: ReleaseFiveImg,
      imageTitle: 'v2.0 User experience:',
      imageDescription:
        // eslint-disable-next-line max-len
        'In this release, all external docs content has been fully migrated allowing the PALs to sunset. The team switcher will allow teams to view assets and documenation through the lens of their team.'
    }
  ]

  return (
    <div className={styles.content}>
      <Grid>
        <Column sm={4} md={8} lg={8} xlg={7}>
          <p className={styles.pageDescription}>
            The new Carbon Design System will provide a single place to find and use all open and
            inner source assets teams need to build consistent, scalable experiences with
            confidence.
          </p>
        </Column>
      </Grid>
      <div className={styles.background}>
        <Grid className={styles.releaseContainer}>
          <Column sm={4} md={4} lg={4} xlg={4}>
            <div className={clsx(styles.header, styles.headerRelease)}>This release</div>
          </Column>
          <Column sm={4} md={4} lg={8} xlg={7}>
            <div className={clsx(styles.description, styles.descriptionRelease)}>
              Our first release is the start to standardizing our community’s assets and surfacing
              them in one shared catalog.
            </div>
          </Column>
        </Grid>
        {pageHighlights.map((pageHighlight, i) => (
          <Grid className={styles.highlightsContainer} key={i}>
            <Column md={4} lg={4} xlg={4} key={i}>
              <div className={styles.header}>{pageHighlight.header}</div>
            </Column>
            <Column md={4} lg={8} xlg={7}>
              <div className={styles.title}>{pageHighlight.title}</div>
              <div className={styles.description}>{pageHighlight.description}</div>
            </Column>
          </Grid>
        ))}
      </div>
      <Grid className={styles.contentContainer}>
        <Column sm={4} md={8} lg={8} xlg={8}>
          <h1 className={clsx(styles.header, styles.headerContent)}>How PAL teams can prepare</h1>
          <p className={clsx(styles.text, styles.text)}>
            Ensure your components, functions, patterns and templates are indexed in our unified
            asset discovery experience by March 30th.
          </p>
          <p className={clsx(styles.text, styles.text)}>
            To make this happen, we ask that you follow the instructions below to document your
            library’s metadata in the stuctured format we have provided.
          </p>
          <Link
            href="https://github.com/carbon-design-system/carbon-platform/blob/main/docs/resource-schemas.md#resource-schemas"
            renderIcon={ArrowRight}
          >
            <a className={styles.link}>{'Get started'}</a>
          </Link>
          <h1 className={clsx(styles.header, styles.headerContent)}>{'Platform roadmap'}</h1>
          <p className={clsx(styles.text, styles.text)}>
            Progress on the following releases are documented in{' '}
            <Link href="https://github.com/carbon-design-system/carbon-platform">
              <a className={styles.link}>GitHub</a>
            </Link>
            , along with milestones, estimated dates, and descriptions of high level outcomes. For a
            visual overview of the following releases and their epics, view our roadmap in{' '}
            <Link href="https://airtable.com/shrshl3XOeeT4Uxq0">
              <a className={styles.link}>Airtable</a>.
            </Link>
          </p>
        </Column>
      </Grid>
      {pageVersionReleases.map((versionRelease, i) => (
        <Grid
          className={clsx(styles.highlightsContainer, styles.highlightsContainerVersion)}
          key={i}
        >
          <Column md={8} lg={4} xlg={4} key={i}>
            <div className={clsx(styles.header, styles.headerVersion)}>
              {versionRelease.version}
            </div>
            <div className={clsx(styles.header, styles.headerTargetRelease)}>
              {versionRelease.targetRelease}
            </div>
            <div className={clsx(styles.header, styles.headerDate)}>{versionRelease.date}</div>
          </Column>
          <Column md={8} lg={8} xlg={7}>
            <div className={clsx(styles.title, styles.titleVersion)}>{versionRelease.title}</div>
            <div className={styles.subtitle}>
              {versionRelease.subtitle ? versionRelease.subtitle : null}
            </div>
            <div
              className={clsx(
                versionRelease.subtitle
                  ? styles.versionDescription
                  : styles.versionDescriptionPaddingNone
              )}
            >
              {versionRelease.description}
            </div>
            {versionRelease.descriptionBlock &&
              versionRelease.descriptionBlock.map((descriptionBlock, o) => (
                <div className={styles.descriptionBlockText} key={o}>
                  <div>{descriptionBlock.title}</div>
                  <div>{descriptionBlock.description}</div>
                </div>
              ))}
            {versionRelease.bulletPointsHeader && (
              <div className={styles.bulletpointsHeader}>{versionRelease.bulletPointsHeader}</div>
            )}
            <ul className={styles.bulletpoints}>
              {versionRelease.bulletPoints &&
                versionRelease.bulletPoints.map((bulletPoint, e) => {
                  return <li key={e}>{'– ' + bulletPoint}</li>
                })}
            </ul>
            <div className={styles.versionImage}>
              <Image
                alt={versionRelease.imageTitle}
                layout="responsive"
                src={versionRelease.image}
                placeholder="blur"
              />
              <div className={styles.imageTextContainer}>
                <h1 className={styles.imageTitle}>{versionRelease.imageTitle}</h1>
                <p className={styles.imageDescription}>{versionRelease.imageDescription}</p>
              </div>
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
      <Hero
        title="Building the future of our design system together"
        // eslint-disable-next-line max-len
        description="IBM teams collectively maintain thousands of reusable assets, such as components and patterns, that enable us to deliver better experiences, faster. But for designers and developers, it can be challenging to find the right assets that comply with platform requirements, are convenient to implement, and are consistent with design patterns across the company."
        image={HeroImg}
        imageAlt="Carbon Next components"
      />
      <PageContent />
    </>
  )
}

export default Index
