/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Button, ButtonSet, Column, Grid, Link as CarbonLink } from '@carbon/react'
import { ArrowRight, Launch } from '@carbon/react/icons'
import { Svg32Github } from '@carbon-platform/icons'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MDXRemote } from 'next-mdx-remote'

// TODO
// import PropTypes from 'prop-types'
import { Dashboard, DashboardItem } from '@/components/dashboard'
import dashboardStyles from '@/components/dashboard/dashboard.module.scss'
import DemoLinks from '@/components/demo-links'
import { H2 } from '@/components/markdown'
import MdxIcon from '@/components/mdx-icon'
import StatusIcon from '@/components/status-icon'
import { framework } from '@/data/framework'
import { createUrl } from '@/utils/string'

import styles from './asset-details.module.scss'

const AssetDetails = ({ library, asset }) => {
  const router = useRouter()

  const otherFrameworkLinks = asset.otherFrameworks
    .sort((a, b) => a.framework.localeCompare(b.framework))
    .map((frameworks, index) => (
      <>
        {index !== 0 && ', '}
        <Link
          href={`/libraries/${frameworks.params.library}/${asset.params.ref}/assets/${asset.params.asset}`}
          passHref
        >
          <CarbonLink size="lg">{framework[frameworks.framework]?.name}</CarbonLink>
        </Link>
      </>
    ))
  return (
    <>
      <section id="dashboard">
        <Dashboard className={styles.dashboard}>
          <Column className={dashboardStyles.column} sm={4}>
            <DashboardItem aspectRatio={{ sm: '2x1', md: '1x1', lg: '3x4', xlg: '1x1' }}>
              <dl>
                <dt className={dashboardStyles.label}>Library</dt>
                <dd className={dashboardStyles['label--large']}>
                  <Link href={library.path} passHref>
                    <CarbonLink className={dashboardStyles['meta-link--large']}>
                      {library.name}
                      <br />
                      {library.version}
                    </CarbonLink>
                  </Link>
                </dd>
              </dl>
              {library.MaintainerIcon && (
                <library.MaintainerIcon
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
                  <dd className={dashboardStyles.meta}>{asset.maintainer}</dd>
                </Column>
                <Column className={dashboardStyles.subcolumn} sm={2} lg={4}>
                  <dt className={dashboardStyles.label}>Type</dt>
                  <dd className={dashboardStyles.meta}>{asset.type}</dd>
                </Column>
                <Column className={dashboardStyles.subcolumn} sm={2} lg={4}>
                  <dt className={dashboardStyles.label}>Framework</dt>
                  <dd className={dashboardStyles.meta}>
                    <MdxIcon
                      name={asset.frameworkIcon}
                      className={dashboardStyles['framework-icon']}
                    />

                    {asset.frameworkName}
                  </dd>
                </Column>
                <Column className={dashboardStyles.subcolumn} sm={2} lg={4}>
                  <dt className={dashboardStyles.label}>Status</dt>
                  <dd className={dashboardStyles.meta}>
                    <StatusIcon className={styles['status-icon']} status={asset.status} />
                    {asset.statusName}
                  </dd>
                </Column>
                <Column
                  className={clsx(dashboardStyles.subcolumn, dashboardStyles['subcolumn--links'])}
                  sm={2}
                  lg={4}
                >
                  <dt className={dashboardStyles.label}>Other frameworks</dt>
                  <dd className={dashboardStyles.meta}>
                    {asset.otherFrameworks.length > 0 ? otherFrameworkLinks : '–'}
                  </dd>
                </Column>
                <Column className={dashboardStyles.subcolumn} sm={2} lg={4}>
                  <dt className={dashboardStyles.label}>Design files</dt>
                  <dd className={dashboardStyles.meta}>
                    <Link href={library.designKitsPath} passHref>
                      <CarbonLink size="lg">View compatible kits</CarbonLink>
                    </Link>
                  </dd>
                </Column>
              </Grid>
              <ButtonSet className={dashboardStyles['button-set']}>
                <Button
                  className={dashboardStyles['dashboard-button']}
                  onClick={() => {
                    router.push(library.assetsPath)
                  }}
                >
                  View library assets
                  <ArrowRight size={16} />
                </Button>{' '}
                {asset.externalDocsUrl && (
                  <Button
                    kind="tertiary"
                    className={dashboardStyles['dashboard-button']}
                    href={asset.externalDocsUrl}
                  >
                    View asset docs
                    <Launch size={16} />
                  </Button>
                )}
              </ButtonSet>
            </DashboardItem>
          </Column>
          <Column className={dashboardStyles.column} sm={0} md={4}>
            <DashboardItem
              aspectRatio={{ md: '2x1', lg: '16x9', xlg: '2x1' }}
              href={`${library.githubRepoUrl}/issues/?q=is%3Aissue+is%3Aopen+in%3Atitle+${asset.name}`}
            >
              <dl>
                <dt className={dashboardStyles.label}>Open issues</dt>
                <dd className={dashboardStyles['label--large']}>{asset.issueCount || 0}</dd>
              </dl>
              <Svg32Github className={dashboardStyles['position-bottom-left']} />
              {!!createUrl(library.githubRepoUrl) && (
                <Launch className={dashboardStyles['position-bottom-right']} size={20} />
              )}
            </DashboardItem>
          </Column>
          <Column className={dashboardStyles.column} sm={0} md={4}>
            <DashboardItem
              aspectRatio={{ md: '2x1', lg: '16x9', xlg: '2x1' }}
              href={`${library.githubRepoUrl}/discussions/?discussions_q=in%3Atitle+${asset.id}`}
            >
              <dl>
                <dt className={dashboardStyles.label}>Discussions</dt>
                <dd className={dashboardStyles['label--large']}>–</dd>
              </dl>
              <Svg32Github className={dashboardStyles['position-bottom-left']} />
              {!!createUrl(library.githubRepoUrl) && (
                <Launch className={dashboardStyles['position-bottom-right']} size={20} />
              )}
            </DashboardItem>
          </Column>
          {asset.demoLinks && (
            <Column sm={4} md={8} lg={8}>
              <section id="demo-links">
                <H2>Demo links</H2>
                <DemoLinks links={[...(asset.demoLinks ?? [])]} />
              </section>
            </Column>
          )}
        </Dashboard>
      </section>
      <section id="remote-content">
        {!!asset.overviewMdxSource?.compiledSource?.value && (
          <MDXRemote compiledSource={asset.overviewMdxSource.compiledSource.value} />
        )}
      </section>
    </>
  )
}

export default AssetDetails

// TODO
// Aside.propTypes = {
//   /**
//    * Child of the Aside.
//    */
//   children: PropTypes.node
// }
