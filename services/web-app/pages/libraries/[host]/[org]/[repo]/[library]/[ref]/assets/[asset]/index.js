/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Column, Grid } from '@carbon/react'
import { Svg64Community } from '@carbon-platform/icons'
import { capitalCase } from 'change-case'
import { get } from 'lodash'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import path from 'path'
import PropTypes from 'prop-types'
import { useContext, useEffect, useRef, useState } from 'react'

import AssetDetails from '@/components/asset-details/asset-details'
import { H1 } from '@/components/markdown'
import PageBreadcrumb from '@/components/page-breadcrumb'
import PageHeader from '@/components/page-header'
import PageNav from '@/components/page-nav'
import PageTabs from '@/components/page-tabs'
import { assetTypes } from '@/data/asset-types'
import { framework } from '@/data/framework'
import { libraryAllowList } from '@/data/libraries.mjs'
import { assetsNavData } from '@/data/nav-data'
import { status } from '@/data/status'
import { teams } from '@/data/teams'
import { LayoutContext } from '@/layouts/layout'
import { getAssetIssueCount, getLibraryData, getRemoteMdxSource } from '@/lib/github'
import pageStyles from '@/pages/pages.module.scss'
import { libraryPropTypes, paramsPropTypes } from '@/types'
import { processMdxSource } from '@/utils/mdx'
import { getAssetType } from '@/utils/schema'
import { getSlug } from '@/utils/slug'
import { createUrl } from '@/utils/string'

import styles from './index.module.scss'

const Asset = ({ libraryData, overviewMdxSource, params }) => {
  const { setPrimaryNavData } = useContext(LayoutContext)
  const router = useRouter()
  const contentRef = useRef(null)
  const [pageNavItems, setPageNavItems] = useState([
    {
      title: 'Dashboard',
      id: 'dashboard'
    }
  ])

  useEffect(() => {
    setPrimaryNavData(assetsNavData)
  }, [setPrimaryNavData])

  useEffect(() => {
    const headers = Array.from(document.querySelectorAll('#remote-content h2')).map((header) => {
      return {
        title: header.textContent,
        id: header.id
      }
    })
    const navItems = [
      {
        title: 'Dashboard',
        id: 'dashboard'
      }
    ]
    if (libraryData?.assets?.[0]?.content?.demoLinks) {
      navItems.push({
        title: 'Demo links',
        id: 'demo-links'
      })
    }
    navItems.push(...headers)
    setPageNavItems(navItems)
  }, [libraryData?.assets])

  if (router.isFallback) {
    return (
      <Grid>
        <Column sm={4} md={8} lg={16}>
          <div className={pageStyles.content}>
            <H1>Loading...</H1>
          </div>
        </Column>
      </Grid>
    )
  }

  const [assetData] = libraryData.assets
  const { name, description } = assetData.content

  const breadcrumbItems = [
    {
      name: getAssetType(assetData).namePlural,
      path: getAssetType(assetData).path
    },
    {
      name
    }
  ]

  const libraryPath = `/libraries/${getSlug(libraryData.content)}/${params.ref}`
  const assetsPath = `/libraries/${params.library}/${params.ref}/assets`
  const designKitsPath = `/libraries/${params.library}/${params.ref}/design-kits`
  const githubRepoUrl = `https://${assetData.params.host}/${assetData.params.org}/${assetData.params.repo}`

  const seo = {
    title: name,
    description
  }

  const { maintainer } = assetData.params
  const MaintainerIcon = teams[maintainer] ? teams[maintainer].pictogram : Svg64Community

  const pageTabs = [
    {
      name: 'Overview',
      path: `/libraries/${assetData.params.library}/latest/assets/${getSlug(assetData.content)}`
    }
  ]

  const dynamicDocKeys = ['usage', 'style', 'code', 'accessibility']

  dynamicDocKeys.forEach((docKey) => {
    if (assetData.content.docs?.[`${docKey}Path`]) {
      pageTabs.push({
        name: capitalCase(docKey),
        path: `/libraries/${assetData.params.library}/latest/assets/${getSlug(
          assetData.content
        )}/${docKey}`
      })
    }
  })

  const frameworkName = assetData.content.framework

  let frameworkIcon = frameworkName
  if (frameworkName === 'vanilla') frameworkIcon = 'js'
  if (frameworkName === 'web-component') frameworkIcon = 'webcomponents'
  if (frameworkName === 'react-native') frameworkIcon = 'react'

  const otherFrameworks = assetData.content.otherFrameworks

  return (
    <div ref={contentRef}>
      <NextSeo {...seo} />
      <Grid>
        <Column sm={4} md={8} lg={{ start: 5, span: 12 }}>
          <PageHeader
            bgColor={get(assetTypes, `[${assetData.content.type}].bgColor`)}
            title={seo.title}
            pictogram={get(assetTypes, `[${assetData.content.type}].icon`)}
            withTabs
          />
          <PageBreadcrumb items={breadcrumbItems} />
        </Column>
        <Column sm={4} md={8} lg={{ start: 5, span: 12 }} className={styles['tabs-column']}>
          <PageTabs className={styles['asset-tabs']} tabs={pageTabs} />
        </Column>
        <Column sm={4} md={8} lg={4}>
          <PageNav items={pageNavItems} contentRef={contentRef} />
        </Column>
        <Column sm={4} md={8} lg={12}>
          <AssetDetails
            library={{
              path: libraryPath,
              name: libraryData.content.name,
              version: `v${libraryData.content.version}`,
              maintainerIcon: MaintainerIcon,
              assetsPath,
              designKitsPath,
              githubRepoUrl
            }}
            asset={{
              ...assetData.content,
              maintainer: get(teams, `[${assetData.params.maintainer}].name`, 'Community'),
              type: get(assetTypes, `[${assetData.content.type}].name`, '–'),
              frameworkIcon,
              frameworkName: get(framework, `[${assetData.content.framework}].name`, '–'),
              status: assetData.statusKey,
              statusName: status[assetData.statusKey]?.name || '-',
              otherFrameworks,
              overviewMdxSource,
              params: assetData.params
            }}
          />
        </Column>
      </Grid>
    </div>
  )
}

Asset.propTypes = {
  libraryData: libraryPropTypes,
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
  params: paramsPropTypes
}

const getOverviewMdxSource = async (assetData, libraryData) => {
  let overviewMdxSource = {}
  if (assetData.content.docs?.overviewPath) {
    let overviewPath = assetData.content.docs?.overviewPath

    const carbonYmlDirPath = assetData.response.path.split('/').slice(0, -1).join('/')
    if (!createUrl(overviewPath)) {
      overviewPath = path.join(carbonYmlDirPath, overviewPath)
    }

    let mdxSource
    let pageUrl
    try {
      const response = await getRemoteMdxSource(libraryData.params, overviewPath)
      mdxSource = response.mdxSource
      pageUrl = response.url

      overviewMdxSource = await processMdxSource(mdxSource, pageUrl)
    } catch (err) {
      overviewMdxSource.mdxError = {
        name: err.name,
        message: err.message,
        stack: err.stack
      }
    }
  }

  return overviewMdxSource
}

export const getServerSideProps = async ({ params }) => {
  const libraryData = await getLibraryData(params)

  if (!libraryData || !libraryData.assets || !libraryData.assets.length) {
    return {
      notFound: true
    }
  }

  const [assetData] = libraryData.assets
  assetData.content.issueCount = await getAssetIssueCount(assetData)

  const overviewMdxSource = await getOverviewMdxSource(assetData, libraryData)

  const otherAssetFrameworks = []
  if (libraryData.params.group) {
    for (const [slug, libraryParams] of Object.entries(libraryAllowList)) {
      if (libraryParams.group === libraryData.params.group) {
        const relatedLibData = await getLibraryData({
          library: slug,
          ref: 'latest',
          ...libraryParams,
          asset: params.asset
        })
        if (
          relatedLibData?.content.id !== libraryData.content.id &&
          !relatedLibData?.content?.noIndex &&
          relatedLibData.assets?.length &&
          !relatedLibData.assets[0].content?.noIndex &&
          relatedLibData.assets[0].content?.framework
        ) {
          otherAssetFrameworks.push({
            framework: relatedLibData.assets[0]?.content.framework,
            params: {
              library: slug,
              ref: 'latest',
              ...libraryParams,
              asset: params.asset
            }
          })
        }
      }
    }
  }

  assetData.content.otherFrameworks = otherAssetFrameworks

  return {
    props: {
      libraryData,
      overviewMdxSource,
      params
    }
  }
}

export default Asset
