/* eslint-disable max-len */
/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid, Link } from '@carbon/react'
import { ArrowRight } from '@carbon/react/icons'
import clsx from 'clsx'

import styles from './asset-landing-page.module.scss'

const AssetLandingPage = () => {
  const pageDescription =
    'The new Carbon Design System will provide a single place to find and use all open and inner source assets they need to build consistent, scalable experiences with confidence.'

  const releaseInfo = {
    header: 'This Release',
    description:
      'Our first release is the start to standardizing our community’s assets and surfacing them in one shared catalog.'
  }

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
        'A common schema will help PAL maintainers more easily manage their assets, keep content fresh in a live index, and add version control to their libraries.'
    }
  ]

  return (
    <>
      <Grid>
        <Column sm={4} md={8} lg={8} xlg={7}>
          <p className={styles.pageDescription}>{pageDescription}</p>
        </Column>
      </Grid>
      <Grid className={styles.releaseContainer}>
        <Column sm={4} md={4} lg={4} xlg={4}>
          <div className={clsx(styles.header, styles.headerRelease)}>{releaseInfo.header}</div>
        </Column>
        <Column sm={4} md={4} lg={8} xlg={7}>
          <div className={clsx(styles.description, styles.descriptionRelease)}>
            {releaseInfo.description}
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
      <Grid className={styles.contentContainer}>
        <Column sm={4} md={8} lg={8} xlg={8}>
          <h1 className={clsx(styles.header, styles.headerContent)}>
            {'How PAL teams can prepare'}
          </h1>
          <p className={clsx(styles.text, styles.text)}>
            {
              'Ensure your components, patterns, and functions are indexed in our unified asset discovery experience by March 30th.'
            }
          </p>
          <p className={clsx(styles.text, styles.text)}>
            {
              'To make this happen, we ask that you follow the instructions below to document your library’s metadata in the stuctured format we have provided.'
            }
          </p>
          <Link href="https://www.google.com" renderIcon={ArrowRight}>
            <a className={styles.link}>{'Get started'}</a>
          </Link>
          <h1 className={clsx(styles.header, styles.headerContent)}>{'Platform roadmap'}</h1>
          <p className={clsx(styles.text, styles.text)}>
            {'Progress on the following releases are documented in '}
            <Link href="https://www.google.com">
              <a className={styles.link}>{'Github'}</a>
            </Link>
            {
              ', along with milestones, estimated dates, and descriptions of high level outcomes. For a visual overview of the following releases and their epics, view our roadmap in '
            }
            <Link href="https://www.google.com">
              <a className={styles.link}>{'Airtable.'}</a>
            </Link>
          </p>
        </Column>
      </Grid>
    </>
  )
}

export default AssetLandingPage
