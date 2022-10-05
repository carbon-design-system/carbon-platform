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
import { useRouter } from 'next/router'
import { MDXRemote } from 'next-mdx-remote'
import PropTypes from 'prop-types'

import ContentWrapper from '@/components/content-wrapper'
import { Dashboard, DashboardItem } from '@/components/dashboard'
import dashboardStyles from '@/components/dashboard/dashboard.module.scss'
import DemoLinks from '@/components/demo-links'
import { H2 } from '@/components/markdown'
import MdxIcon from '@/components/mdx-icon'
import StatusIcon from '@/components/status-icon'
import { framework } from '@/data/framework'
import { assetContentPropTypes, paramsPropTypes } from '@/types'
import { createUrl } from '@/utils/string'

import styles from './asset-details.module.scss'

const createMaintainerIcon = (MaintainerIcon) => {
  if (!MaintainerIcon) {
    return null
  }

  return (
    <MaintainerIcon
      className={clsx(dashboardStyles['position-bottom-left'], styles['maintainer-icon'])}
      size={64}
    />
  )
}

const createOtherFrameworkLinks = (otherFrameworks) => {
  if (!otherFrameworks.length) {
    return '–'
  }

  return otherFrameworks
    .sort((a, b) => a.framework.localeCompare(b.framework))
    .map((frameworks, index) => (
      <>
        {index !== 0 && ', '}
        <CarbonLink
          size="lg"
          href={`/libraries/${frameworks.params.library}/${frameworks.params.ref}/assets/${frameworks.params.asset}`}
        >
          {framework[frameworks.framework]?.name}
        </CarbonLink>
      </>
    ))
}

const AssetDetails = ({ library, asset }) => {
  const router = useRouter()

  return (
    <ContentWrapper>
      <section id="dashboard">
        <Dashboard className={styles.dashboard}>
          <Column className={dashboardStyles.column} sm={4}>
            <DashboardItem aspectRatio={{ sm: '2x1', md: '1x1', lg: '3x4', xlg: '1x1' }}>
              <dl>
                <dt className={dashboardStyles.label}>Library</dt>
                <dd className={dashboardStyles['label--large']}>
                  <CarbonLink className={dashboardStyles['meta-link--large']} href={library.path}>
                    {library.name}
                    <br />
                    {library.version}
                  </CarbonLink>
                </dd>
              </dl>
              {createMaintainerIcon(library.maintainerIcon)}
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
                    {createOtherFrameworkLinks(asset.otherFrameworks)}
                  </dd>
                </Column>
                <Column className={dashboardStyles.subcolumn} sm={2} lg={4}>
                  <dt className={dashboardStyles.label}>Design files</dt>
                  <dd className={dashboardStyles.meta}>
                    <CarbonLink size="lg" href={library.designKitsPath}>
                      View compatible kits
                    </CarbonLink>
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
    </ContentWrapper>
  )
}

export default AssetDetails

AssetDetails.propTypes = {
  /**
   * Object containing finalized asset properties.
   */
  asset: PropTypes.shape({
    demoLinks: assetContentPropTypes.demoLinks,
    externalDocsUrl: PropTypes.string,
    frameworkIcon: PropTypes.node,
    frameworkName: PropTypes.string,
    id: assetContentPropTypes.id,
    issueCount: PropTypes.number,
    maintainer: PropTypes.string,
    name: assetContentPropTypes.name,
    otherFrameworks: PropTypes.arrayOf(
      PropTypes.shape({
        framework: PropTypes.oneOf([
          'angular',
          'react',
          'react-native',
          'svelte',
          'vanilla',
          'vue',
          'web-component',
          'design-only'
        ]),
        params: paramsPropTypes
      })
    ),
    overviewMdxSource: PropTypes.shape({
      compiledSource: PropTypes.shape({
        value: PropTypes.string,
        data: PropTypes.shape({
          matter: PropTypes.object
        })
      }),
      mdxError: PropTypes.shape({
        name: PropTypes.string,
        message: PropTypes.string,
        stack: PropTypes.string,
        position: PropTypes.string
      }),
      warnings: PropTypes.arrayOf(PropTypes.string)
    }),
    params: paramsPropTypes,
    status: assetContentPropTypes.status,
    statusName: PropTypes.string,
    type: assetContentPropTypes.type
  }),
  /**
   * Object containing library details the asset belongs to.
   */
  library: PropTypes.shape({
    path: PropTypes.string,
    name: PropTypes.string,
    version: PropTypes.string,
    maintainerIcon: PropTypes.node,
    assetsPath: PropTypes.string,
    designKitsPath: PropTypes.string,
    githubRepoUrl: PropTypes.string
  })
}
