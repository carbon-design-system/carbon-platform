/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'
import { capitalCase } from 'change-case'
import { get } from 'lodash'
import Head from 'next/head'
import { MDXRemote } from 'next-mdx-remote'
import { NextSeo } from 'next-seo'
import { useContext, useEffect } from 'react'

import PageBreadcrumb from '@/components/page-breadcrumb/page-breadcrumb'
import PageHeader from '@/components/page-header/page-header'
import PageTabs from '@/components/page-tabs'
import { assetsNavData } from '@/data/nav-data'
import { type } from '@/data/type'
import { LayoutContext } from '@/layouts/layout/layout'
import { getAllLibraries, getLibraryData, getRemoteMdxData } from '@/lib/github'
import { getAssetType } from '@/utils/schema'
import { getSlug } from '@/utils/slug'
import { isValidHttpUrl } from '@/utils/string'

import styles from './[tab].module.scss'

const AssetTabPage = ({ source, tabs, assetData }) => {
  const { title, description, keywords } = source.frontmatter

  const { setPrimaryNavData } = useContext(LayoutContext)

  useEffect(() => {
    setPrimaryNavData(assetsNavData)
  }, [setPrimaryNavData])

  const { name } = assetData.content

  const breadcrumbItems = [
    {
      name: getAssetType(assetData).namePlural,
      path: getAssetType(assetData).path
    },
    {
      name
    }
  ]

  return (
    <>
      <NextSeo title={title} description={description} keywords={keywords} />
      <Grid narrow>
        <Column lg={{ span: 12, offset: 4 }}>
          {title && (
            <PageHeader
              title={title}
              withTabs
              bgColor={get(type, `[${assetData.content.type}].bgColor`)}
              pictogram={get(type, `[${assetData.content.type}].icon`)}
            />
          )}
          <PageBreadcrumb items={breadcrumbItems} />
          {keywords && (
            <Head>
              <meta name="keywords" content={keywords} />
            </Head>
          )}
          {tabs && (
            <PageTabs
              className={styles['asset-tabs']}
              title={source.frontmatter.title}
              tabs={tabs}
            />
          )}
          <div className={styles['page-content']}>
            <MDXRemote {...source} />
          </div>
        </Column>
      </Grid>
    </>
  )
}

export const getStaticProps = async ({ params }) => {
  console.log('hey')
  const libraryData = await getLibraryData(params)

  console.log(params)

  if (!libraryData || !libraryData.assets || !libraryData.assets.length) {
    return {
      notFound: true
    }
  }

  const [assetData] = libraryData.assets

  let src = ''

  let { host, org, repo, ref, tab } = params

  switch (tab) {
    case 'accessibility':
      src = assetData.content.docs.accessibilityPath
      break
    case 'usage':
      src = assetData.content.docs.usagePath
      break
    case 'style':
      src = assetData.content.docs.stylePath
      break
    case 'code':
      src = assetData.content.docs.codePath
      break
  }

  if (isValidHttpUrl(src)) {
    const url = new URL(src)
    host = url.host
    const pathNameChunks = url.pathname.split('/')
    org = pathNameChunks[1]
    repo = pathNameChunks[2]
    ref = pathNameChunks[4]
    src = pathNameChunks.slice(5, pathNameChunks.length).join('/')
  }

  const mdxSource = await getRemoteMdxData(
    {
      host,
      org,
      repo,
      ref
    },
    src
  )

  const pageTabs = [
    {
      name: 'Overview',
      path: `/assets/${assetData.params.library}/latest/${getSlug(assetData.content)}`
    }
  ]

  const dynamicDocKeys = ['usage', 'style', 'code', 'accessibility']

  dynamicDocKeys.forEach((docKey) => {
    if (assetData.content.docs?.[`${docKey}Path`]) {
      pageTabs.push({
        name: capitalCase(docKey),
        path: `/assets/${assetData.params.library}/latest/${getSlug(assetData.content)}/${docKey}`
      })
    }
  })

  return {
    props: {
      source: mdxSource,
      tabs: pageTabs,
      assetData
    }
  }
}

export const getStaticPaths = async () => {
  const librariesData = await getAllLibraries()

  const pages = []

  const dynamicDocKeys = ['usage', 'style', 'code', 'accessibility']

  librariesData.libraries.forEach((library) => {
    if (library.assets && library.assets.length) {
      library.assets.forEach((asset) => {
        dynamicDocKeys.forEach((docKey) => {
          if (asset.content.docs?.[`${docKey}Path`]) {
            pages.push({
              params: { ...library.params, asset: getSlug(asset.content), tab: docKey }
            })
            // hardcoding latest for now, TODO: remove once MDX epic is done
            pages.push({
              params: {
                ...library.params,
                asset: getSlug(asset.content),
                tab: docKey,
                ref: 'latest'
              }
            })
          }
        })
      })
    }
  })

  return {
    paths: pages,
    // returning 404 if page wasn't generated at build time
    // to prevent remote mdx dynamic loading for now
    fallback: false
  }
}

export default AssetTabPage
