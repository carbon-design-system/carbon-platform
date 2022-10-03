/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid, Link } from '@carbon/react'
import Image from 'next/image'
import { NextSeo } from 'next-seo'
import { useContext, useEffect } from 'react'

import Divider from '@/components/divider/divider'
import H2 from '@/components/markdown/h2'
import H3 from '@/components/markdown/h3'
import PageHeader from '@/components/page-header'
import { assetsNavData } from '@/data/nav-data'
import { LayoutContext } from '@/layouts/layout'

import ReleaseOneImg from './images/roadmap-v0.1.png'
import ReleaseTwoImg from './images/roadmap-v0.2.png'
import ReleaseThreeImg from './images/roadmap-v1.0.png'
import ReleaseFourImg from './images/roadmap-v1.1.png'
import ReleaseFiveImg from './images/roadmap-v2.0.png'
import styles from './platform-roadmap.module.scss'

const PageContent = () => {
  const releases = [
    {
      version: 'v0.1',
      release: 'Released:',
      date: 'February 25',
      title: 'Standardize assets and libraries',
      description:
        'This private beta is the start to standardizing Carbon so we can bring everything ' +
        'together as one system. This release is focused on helping PAL maintainers classify ' +
        'libraries and assets through the application of a common schema. This release also ' +
        'prototypes asset discovery improvements as Carbon gets indexed through the application ' +
        'of the schema.',
      image: ReleaseOneImg,
      captionHeading: 'v0.1 User experience',
      caption:
        'Catalog assets link directly out to Carbon Design System and PAL sites to access an ' +
        'asset’s usage documentation.'
    },
    {
      version: 'v0.2',
      release: 'Released:',
      date: 'March 31',
      title: 'Asset catalog experience',
      description:
        'This release adds library and asset detail pages to surface the standardized content ' +
        'coming from the applied schema. All detail pages link out to the legacy Carbon and PAL ' +
        'websites for complete documentation while that additional content gets indexed into the ' +
        'system.',
      bulletPoints: [
        'Indexed Carbon Charts, Carbon Charts Angular, Carbon Charts React, Carbon Charts ' +
          'Svelte, Carbon Charts Vue, IBM.com React, and IBM.com Web Components libraries that ' +
          'are included in the catalogs',
        'Indexed IBM.com Services, IBM.com Styles, and IBM.com Utilities libraries that are ' +
          'excluded from the catalogs and will be surfaced in a v2 release local system',
        'New external docs and demo links, and open GitHub issue counts, in asset detail pages'
      ],
      image: ReleaseTwoImg,
      captionHeading: 'v0.2 User experience',
      caption:
        'Users can begin to access some library and asset docs without leaving the platform; ' +
        'however the user will still need to go offsite for more detailed usage documentation.'
    },
    {
      version: 'v1.0',
      release: 'Released:',
      date: 'September 30',
      title: 'Public beta',
      description:
        'The platform’s first major release helps system users discover and learn about all ' +
        'the assets and libraries in the system with confidence in their completeness, who ' +
        'maintains them, and how to use them. System users can access documentation for all ' +
        'indexed assets and libraries without leaving the platform.',
      bulletPoints: [
        'Still hosted on the “next” subdomain',
        'All legacy Carbon website content available in the site',
        'All open-source Carbon libraries indexed and available in the catalogs'
      ],
      image: ReleaseThreeImg,
      captionHeading: 'v1.0 User experience',
      caption:
        'This release achieves content parity with the current Carbon website — all 32 “core” ' +
        'components have complete asset detail pages.'
    },
    {
      version: 'v1.x',
      release: 'Target releases:',
      date: 'Q4 2022',
      title: 'IBM internal content, search, and standards',
      description:
        'The following minor releases add authentication to Carbon’s website so you can log in as ' +
        'an IBM employee to view IBM internal content. Search capabilities will be added for all ' +
        'indexed content.',
      bulletPoints: [
        'New login capabilities to view IBM internal content',
        'IBM internal Carbon libraries indexed and available in the catalogs upon logging in',
        'New search capabilities',
        'New standards added to the site'
      ],
      image: ReleaseFourImg,
      captionHeading: 'v1.x User experience',
      caption:
        'In this release standards content will be available on the platform and IBM internal ' +
        'libraries will be discoverable after logging in.'
    },
    {
      version: 'v2.0',
      release: 'Target release:',
      date: '2023',
      title: 'System of systems',
      subtitle: 'The platform’s second major release will take the following Hills 1A, 1B, and 1C:',
      description: '',
      descriptionBlock: [
        {
          title: 'Explore with confidence',
          description:
            'An IBM Maker [designers, developers, product managers delivering to the IBM ecosystem] ' +
            'can discover and learn about resources [standards and components/patterns] in the ' +
            'system with confidence in their completeness, who maintains them and where they’re used.'
        },
        {
          title: 'Contribute with ease',
          description:
            'An IBM Maker [designers, developers, product managers delivering to the IBM ' +
            'ecosystem] can create, document, share new resources [standards and ' +
            'components/patterns] to the system without Design Program Office (DPO) involvement ' +
            'or coding a documentation website.'
        },
        {
          title: 'Team experience',
          description:
            'An IBM Maker [designers, developers, product managers delivering to the IBM ' +
            'ecosystem] can consume any applicable and versioned resources [standards and ' +
            'components/patterns] for their team, in a single, curated experience.'
        }
      ],
      bulletPointsHeader: 'This evolves the platform into a system of systems, with:',
      bulletPoints: [
        'Pattern and Asset Library (PAL) sites migrated as local systems',
        'PAL sites sunset with redirects to Carbon’s website',
        'Resource cross-linking among standards, libraries, assets',
        'New code package and component usage analytics',
        'Contribution preview experience to improve markdown and MDX authoring'
      ],
      image: ReleaseFiveImg,
      captionHeading: 'v2.0 User experience',
      caption:
        'In this release, all external docs content has been fully migrated allowing the PALs ' +
        'to sunset. The team switcher will allow teams to view assets and documentation through ' +
        'the lens of their team.'
    }
  ]

  return (
    <div>
      <Grid>
        <Column sm={4} md={8}>
          <p className={styles['intro-copy']}>
            Progress on the following releases are documented in{' '}
            <Link href="https://github.com/carbon-design-system/carbon-platform">GitHub</Link>,
            along with milestones, estimated dates, and descriptions of high level outcomes. For a
            visual overview of the following releases and their epics, view our roadmap in{' '}
            <Link href="https://app.zenhub.com/workspaces/platform-product-management-624ca9397d28730018df40c2/roadmap">
              Zenhub
            </Link>
            .
          </p>
        </Column>
      </Grid>
      {releases.map((release, i) => (
        <Divider key={i}>
          <Grid className={styles.release}>
            <Column sm={4} md={8} lg={4}>
              <H2>
                <div>
                  <strong>{release.version}</strong>
                </div>
                <div>{release.release}</div>
                <div>{release.date}</div>
              </H2>
            </Column>
            <Column sm={4} md={8}>
              <div className={styles['release-content']}>
                {release.title && (
                  <H3
                    className={styles['h3-container']}
                    headingClassName={styles['release-subheading']}
                  >
                    {release.title}
                  </H3>
                )}
                {release.subtitle && <p className={styles['release-copy']}>{release.subtitle}</p>}
                {release.description && (
                  <p className={styles['release-copy']}>{release.description}</p>
                )}
                {release.descriptionBlock &&
                  release.descriptionBlock.map((descriptionBlock, o) => (
                    <div className={styles['release-copy']} key={o}>
                      <p>{descriptionBlock.title}</p>
                      <p>{descriptionBlock.description}</p>
                    </div>
                  ))}
                {release.bulletPointsHeader && (
                  <p className={styles['release-copy']}>{release.bulletPointsHeader}</p>
                )}
                {release.bulletPoints && (
                  <ul className={styles['release-copy']}>
                    {release.bulletPoints.map((bulletPoint, e) => {
                      return <li key={e}>{'– ' + bulletPoint}</li>
                    })}
                  </ul>
                )}
              </div>
              <div className={styles['release-image']}>
                <Image
                  alt={release.captionHeading}
                  layout="responsive"
                  src={release.image}
                  placeholder="blur"
                />
                <p className={styles['release-image-caption']}>
                  <strong>{release.captionHeading}:</strong> {release.caption}
                </p>
              </div>
            </Column>
          </Grid>
        </Divider>
      ))}
    </div>
  )
}

const PlatformRoadmap = () => {
  const { setPrimaryNavData } = useContext(LayoutContext)

  const seo = {
    title: 'Platform roadmap'
  }

  useEffect(() => {
    setPrimaryNavData(assetsNavData)
  }, [setPrimaryNavData])

  return (
    <>
      <NextSeo {...seo} />
      <PageHeader title={seo.title} />
      <PageContent />
    </>
  )
}

export default PlatformRoadmap
