/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { TextInput } from '@carbon/pictograms-react'
import { Column, Grid } from '@carbon/react'
import { ArrowRight, Launch } from '@carbon/react/icons'
import clsx from 'clsx'
import { get } from 'lodash'
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
import { framework } from '@/data/framework'
import { assetsNavData } from '@/data/nav-data'
import { status } from '@/data/status'
import { teams } from '@/data/teams'
import { type } from '@/data/type'
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
            <p className={dashboardStyles.title}>Library</p>
            <h3 className={dashboardStyles.titleLarge}>{libraryData.content.name}</h3>
            <Link href={assetPath}>
              <a className={styles.metaLinkLarge}>{'v.' + libraryData.content.version}</a>
            </Link>
            {SponsorIcon && <SponsorIcon className={styles.metaAbsolute} size={64} />}
          </DashboardItem>
        </Column>
        <Column className={dashboardStyles.column} lg={2}>
          <DashboardItem aspectRatio={{ sm: '1x1', lg: 'none', xlg: 'none' }} border={['sm']}>
            <Grid columns={2} className={dashboardStyles.subgrid}>
              <Column className={clsx(styles.metaInfo, dashboardStyles.subcolumn)}>
                <p className={dashboardStyles.title}>Sponsor</p>
                <Link href={assetPath}>
                  <a className={styles.metaLinkDashboard}>{libraryData.content.name}</a>
                </Link>
              </Column>
              <Column className={dashboardStyles.subcolumn}>
                <p className={dashboardStyles.title}>Type</p>
                <h3 className={dashboardStyles.subtitle}>
                  {get(type, `[${assetData.content.type}].name`, '–')}
                </h3>
              </Column>
              <Column className={dashboardStyles.subcolumn}>
                <p className={dashboardStyles.title}>Framework</p>
                <h3 className={dashboardStyles.subtitle}>
                  {get(framework, `[${assetData.content.framework}].name`, '–')}
                </h3>
              </Column>
              <Column className={dashboardStyles.subcolumn}>
                <p className={dashboardStyles.title}>Status</p>
                <h3 className={styles.metaStatus}>
                  <StatusIcon className={styles.metaIcon} status={assetData.content.status} />
                  {get(status, `[${assetData.content.status}].name`, '–')}
                </h3>
              </Column>
              <Column className={clsx(dashboardStyles.subcolumn, dashboardStyles.subcolumnLinks)}>
                <p className={clsx(dashboardStyles.title)}>Demo links</p>
                <Link href={assetPath}>
                  <a className={styles.metaLinkDashboard}>{libraryData.content.name}</a>
                </Link>
              </Column>
              <Column className={dashboardStyles.subcolumn}>
                <p className={dashboardStyles.title}>Tag</p>
                <h3 className={dashboardStyles.subtitle}>{'some content'}</h3>
              </Column>
            </Grid>
            <Link href={assetPath}>
              <a className={dashboardStyles.linkContainer}>
                <div className={dashboardStyles.linkText}>Get the kits</div>
                <ArrowRight size={16} />
              </a>
            </Link>
          </DashboardItem>
        </Column>
        <Column className={dashboardStyles.column} sm={0} md={1}>
          <Link href={assetPath}>
            <a className={styles.metaLink}>
              <DashboardItem
                aspectRatio={{ md: '2x1', lg: '16x9', xlg: '2x1' }}
                border={['sm', 'md', 'lg', 'xlg']}
                clickable
              >
                <p className={dashboardStyles.title}>Pull requests</p>
                <h3 className={dashboardStyles.titleLarge}>{libraryData.response.size}</h3>
                {SponsorIcon && <SponsorIcon className={styles.metaAbsolute} size={32} />}
                <Launch className={styles.metaRightAbsolute} size={20} />
              </DashboardItem>
            </a>
          </Link>
        </Column>
        <Column className={dashboardStyles.column} sm={0} md={1}>
          <Link href={assetPath}>
            <a className={styles.metaLink}>
              <DashboardItem
                aspectRatio={{ md: '2x1', lg: '16x9', xlg: '2x1' }}
                border={['sm', 'md', 'lg', 'xlg']}
                clickable
              >
                <p className={dashboardStyles.title}>Pull requests</p>
                <h3 className={dashboardStyles.titleLarge}>{libraryData.response.size}</h3>
                {SponsorIcon && <SponsorIcon className={styles.metaAbsolute} size={32} />}
                <Launch className={styles.metaRightAbsolute} size={20} />
              </DashboardItem>
            </a>
          </Link>
        </Column>
        <Column className={dashboardStyles.column} sm={0} md={1}>
          <Link href={assetPath}>
            <a className={styles.metaLink}>
              <DashboardItem
                aspectRatio={{ md: '2x1', lg: '16x9', xlg: '2x1' }}
                border={['sm', 'md', 'lg', 'xlg']}
                clickable
              >
                <p className={dashboardStyles.title}>Open issues</p>
                <h3 className={dashboardStyles.titleLarge}>{libraryData.response.size}</h3>
                {SponsorIcon && <SponsorIcon className={styles.metaAbsolute} size={32} />}
                <Launch className={styles.metaRightAbsolute} size={20} />
              </DashboardItem>
            </a>
          </Link>
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
