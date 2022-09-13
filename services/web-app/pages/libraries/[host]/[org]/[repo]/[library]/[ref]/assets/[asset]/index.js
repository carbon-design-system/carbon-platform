/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Column, Grid } from '@carbon/react'
import { Svg64Community } from '@carbon-platform/icons'
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
import { assetsNavData } from '@/data/nav-data'
import { status } from '@/data/status'
import { teams } from '@/data/teams'
import { LayoutContext } from '@/layouts/layout'
import { getAssetIssueCount, getAssetRelatedFrameworks, getLibraryData } from '@/lib/github'
import pageStyles from '@/pages/pages.module.scss'
import { libraryPropTypes, paramsPropTypes } from '@/types'
import { getProcessedMdxSource } from '@/utils/mdx'
import { getAssetTabs, getAssetType } from '@/utils/schema'
import { getSlug } from '@/utils/slug'
import { createUrl } from '@/utils/string'

import styles from './index.module.scss'

const frameworkNameToIconMap = {
  vanilla: 'js',
  'web-components': 'webcomponents',
  'react-native': 'react'
}

const Fallback = () => (
  <Grid>
    <Column sm={4} md={8} lg={16}>
      <div className={pageStyles.content}>
        <H1>Loading...</H1>
      </div>
    </Column>
  </Grid>
)

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
    return <Fallback />
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

  const pageTabs = getAssetTabs(assetData)

  const frameworkName = assetData.content.framework

  const frameworkIcon = frameworkNameToIconMap[frameworkName] || frameworkName

  const otherFrameworks = assetData.content.otherFrameworks

  return (
    <div ref={contentRef}>
      <NextSeo {...seo} />
      <Grid>
        <Column sm={4} md={8} lg={{ start: 5, span: 12 }}>
          <PageHeader
            bgColor={assetTypes[assetData.content.type]?.bgColor}
            title={seo.title}
            pictogram={assetTypes[assetData.content.type]?.icon}
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
              maintainer: teams[assetData?.params?.maintainer]?.name || 'Community',
              type: assetTypes[assetData?.content?.type]?.name || '–',
              frameworkIcon,
              frameworkName: framework[assetData?.content?.framework]?.name || '–',
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

/**
 * Given an asset, retrieves the overview section mdx source content if path defined in asset index
 * @param {import('@/typedefs').Asset} assetData
 * @param {import('@/typedefs').Library} libraryData
 * @returns {Promise<import('@/typedefs').RemoteMdxSource>}
 * mdxSource or empty object
 */
const getOverviewMdxSource = async (assetData, libraryData) => {
  let overviewMdxSource = {}
  if (assetData.content.docs?.overviewPath) {
    let overviewPath = assetData.content.docs?.overviewPath

    const carbonYmlDirPath = assetData.response.path.split('/').slice(0, -1).join('/')
    if (!createUrl(overviewPath)) {
      overviewPath = path.join(carbonYmlDirPath, overviewPath)
    }

    overviewMdxSource = await getProcessedMdxSource(libraryData.params, overviewPath)
  }

  return overviewMdxSource
}

export const getServerSideProps = async ({ res, params }) => {
  // page will be considered valid for an hour
  // after that stale content will be served for 59s while it refreshes
  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=59')
  const libraryData = await getLibraryData(params)

  if (!libraryData || !libraryData.assets || !libraryData.assets.length) {
    return {
      notFound: true
    }
  }

  const [assetData] = libraryData.assets
  assetData.content.issueCount = await getAssetIssueCount(assetData)

  const overviewMdxSource = await getOverviewMdxSource(assetData, libraryData)

  assetData.content.otherFrameworks = await getAssetRelatedFrameworks(params, libraryData)

  return {
    props: {
      libraryData,
      overviewMdxSource,
      params
    }
  }
}

export default Asset
