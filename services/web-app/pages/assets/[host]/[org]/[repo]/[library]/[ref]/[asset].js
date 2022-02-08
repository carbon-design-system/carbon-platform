/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { TextInput } from '@carbon/pictograms-react'
import { Column, Grid } from '@carbon/react'
import { ArrowRight } from '@carbon/react/icons'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { useContext, useEffect } from 'react'

import { Dashboard, DashboardItem } from '@/components/dashboard'
import dashboardStyles from '@/components/dashboard/dashboard.module.scss'
import PageBreadcrumb from '@/components/page-breadcrumb'
import PageHeader from '@/components/page-header'
import StatusIcon from '@/components/status-icon'
import { framework as frameworkMap } from '@/data/framework'
import { assetsNavData } from '@/data/nav-data'
import { status } from '@/data/status'
import { teams } from '@/data/teams'
import { LayoutContext } from '@/layouts/layout'
import { getLibraryData } from '@/lib/github'
import styles from '@/pages/pages.module.scss'
import { getSlug } from '@/utils/slug'

const InheritsLink = ({ data }) => {
  if (!data || !data.asset) return null

  const [libraryId] = data.asset.split('@')
  const libraryRef = data.asset.slice(data.asset.indexOf('@') + 1, data.asset.lastIndexOf('/'))
  const [assetId] = data.asset.split('/').reverse()

  return (
    <div>
      Inherits{' '}
      <Link href={`/assets/${libraryId}/${libraryRef || 'latest'}/${assetId}`}>
        <a>{data.asset}</a>
      </Link>
    </div>
  )
}

const Asset = ({ libraryData }) => {
  const { setNavData } = useContext(LayoutContext)
  const router = useRouter()

  useEffect(() => {
    setNavData(assetsNavData)
  }, [setNavData])

  if (router.isFallback) {
    return (
      <div className={styles.content}>
        <h1>Loading...</h1>
      </div>
    )
  }

  const [assetData] = libraryData.assets
  const { name, description, inherits: inheritsData, thumbnailData: imageData } = assetData.content
  const assetFramework = assetData.content.framework
  const framework = frameworkMap[assetFramework].name

  const breadcrumbItems = [
    {
      name: 'Libraries',
      path: '/assets/libraries'
    },
    {
      name: libraryData.content.name,
      path: `/assets/${getSlug(libraryData.content)}`
    },
    {
      name
    }
  ]

  const assetPath = breadcrumbItems[1].path

  const seo = {
    title: name,
    description
  }

  const { sponsor } = assetData.params
  const SponsorIcon = teams[sponsor] && teams[sponsor].icon

  const AssetItemMeta = ({ properties }) => {
    const renderStatus = () => {
      const { name: assetStatus } = status[assetData.content.status]

      if (!assetStatus) return null

      return (
        <>
          <StatusIcon className={styles.metaIcon} status={assetData.content.status} />
          <span className={styles.metaStatus}>{assetStatus}</span>
        </>
      )
    }

    return (
      <ul className={styles.meta}>
        {properties.map((prop, i) => (
          <li key={i}>{prop === 'status' && renderStatus()}</li>
        ))}
      </ul>
    )
  }

  return (
    <>
      <PageHeader title={seo.title} pictogram={TextInput} />
      <PageBreadcrumb items={breadcrumbItems} />
      <Dashboard className={styles.content}>
        <Column className={dashboardStyles.column}>
          <DashboardItem
            aspectRatio={{ sm: '2x1', md: '1x1', lg: '3x4', xlg: '1x1' }}
            border={['sm']}
          >
            <p className={dashboardStyles.title}>Maintainer</p>
            <h3 className={dashboardStyles.titleLarge}>{libraryData.content.name}</h3>
            <AssetItemMeta
              className={clsx(dashboardStyles.title, styles.meta)}
              properties={['status']}
            />
            {SponsorIcon && <SponsorIcon className={styles.metaAbsolute} size={64} />}
          </DashboardItem>
        </Column>
        <Column className={dashboardStyles.column} lg={2}>
          <DashboardItem aspectRatio={{ sm: '1x1', lg: 'none', xlg: 'none' }} border={['sm']}>
            <Grid columns={2} className={dashboardStyles.subgrid}>
              <Column className={clsx(styles.metaInfo, dashboardStyles.subcolumn)}>
                <p className={dashboardStyles.title}>Library</p>
                <Link href={`${assetPath}`}>
                  <a className={styles.metaLink}>{libraryData.content.name}</a>
                </Link>
              </Column>
              <Column>
                <p className={clsx(dashboardStyles.title, dashboardStyles.subcolumn)}>Version</p>
                <h3 className={clsx(dashboardStyles.subtitle, dashboardStyles.subcolumn)}>
                  {libraryData.content.version}
                </h3>
              </Column>
              <Column>
                <p className={clsx(dashboardStyles.title, dashboardStyles.subcolumn)}>License</p>
                <h3 className={dashboardStyles.subtitle}>{libraryData.content.license}</h3>
              </Column>
              <Column>
                <p className={clsx(dashboardStyles.title, dashboardStyles.subcolumn)}>Framework</p>
                <h3 className={dashboardStyles.subtitle}>{framework}</h3>
              </Column>
              <Column>
                <p className={clsx(dashboardStyles.title, dashboardStyles.subcolumn)}>
                  Page last modified
                </p>
                <h3 className={dashboardStyles.subtitle}>June 30, 2022</h3>
              </Column>
              <Column>
                <p className={clsx(dashboardStyles.title, dashboardStyles.subcolumn)}>
                  Primary design kit
                </p>
                <h3 className={dashboardStyles.subtitle}>Sketch</h3>
              </Column>
            </Grid>
            <Column className={dashboardStyles.designKit}>
              <Link href={`${assetPath}`} className={dashboardStyles.designKitText}>
                <a>
                  <div className={dashboardStyles.designKitTitle}>Get the kits</div>
                  <ArrowRight className={dashboardStyles.designKitIcon} size={16} />
                </a>
              </Link>
            </Column>
          </DashboardItem>
        </Column>
        <Column className={dashboardStyles.column} sm={0} md={1}>
          <Link href={`${assetPath}`}>
            <a className={styles.metaLink}>
              <DashboardItem
                aspectRatio={{ md: '2x1', lg: '16x9', xlg: '2x1' }}
                border={['sm', 'md', 'lg', 'xlg']}
              >
                <p className={dashboardStyles.title}>Weekly downloads</p>
                <h3 className={dashboardStyles.titleLarge}>{'+' + libraryData.response.size}</h3>
                {SponsorIcon && <SponsorIcon className={styles.metaAbsolute} size={32} />}
              </DashboardItem>
            </a>
          </Link>
        </Column>
        <Column className={dashboardStyles.column} sm={0} md={1}>
          <Link href={`${assetPath}`}>
            <a className={styles.metaLink}>
              <DashboardItem
                aspectRatio={{ md: '2x1', lg: '16x9', xlg: '2x1' }}
                border={['sm', 'md', 'lg', 'xlg']}
              >
                <p className={dashboardStyles.title}>Pull requests</p>
                <h3 className={dashboardStyles.titleLarge}>{libraryData.response.size}</h3>
                {SponsorIcon && <SponsorIcon className={styles.metaAbsolute} size={32} />}
              </DashboardItem>
            </a>
          </Link>
        </Column>
        <Column className={dashboardStyles.column} sm={0} md={1}>
          <Link href={`${assetPath}`}>
            <a className={styles.metaLink}>
              <DashboardItem
                aspectRatio={{ md: '2x1', lg: '16x9', xlg: '2x1' }}
                border={['sm', 'md', 'lg', 'xlg']}
              >
                <p className={dashboardStyles.title}>Open issues</p>
                <h3 className={dashboardStyles.titleLarge}>{libraryData.response.size}</h3>
                {SponsorIcon && <SponsorIcon className={styles.metaAbsolute} size={32} />}
              </DashboardItem>
            </a>
          </Link>
          <Column>
            {SponsorIcon && <SponsorIcon className={styles.metaAbsolute} size={32} />}
          </Column>
        </Column>
        <Column className={dashboardStyles.column} sm={0} md={1} lg={0}>
          <DashboardItem
            aspectRatio={{ md: '2x1', lg: '16x9', xlg: '2x1' }}
            border={['sm', 'md', 'lg', 'xlg']}
            spacer
          />
        </Column>
      </Dashboard>
      <div className={styles.content}>
        <NextSeo {...seo} />
        {inheritsData && <InheritsLink data={inheritsData} />}
        {imageData && (
          <Image
            alt={`${name} thumbnail`}
            height="300px"
            width="400px"
            src={imageData.img.src}
            placeholder={imageData.img.type === 'svg' ? 'empty' : 'blur'}
            blurDataURL={imageData.base64}
          />
        )}
        <pre className={styles.data}>{JSON.stringify(libraryData, null, 2)}</pre>
      </div>
    </>
  )
}

export const getStaticProps = async ({ params }) => {
  const libraryData = await getLibraryData(params)

  if (!libraryData || !libraryData.assets || !libraryData.assets.length) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      libraryData,
      params
    },
    revalidate: 10
  }
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true
  }
}

export default Asset
