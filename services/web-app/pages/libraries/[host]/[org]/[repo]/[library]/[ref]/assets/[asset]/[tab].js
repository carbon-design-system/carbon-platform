/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'
import { MDXRemote } from 'next-mdx-remote'
import path from 'path'
import { useContext, useEffect, useRef, useState } from 'react'

import MdxPage from '@/components/mdx-page/mdx-page'
import PageBreadcrumb from '@/components/page-breadcrumb/page-breadcrumb'
import PageHeader from '@/components/page-header/page-header'
import PageNav from '@/components/page-nav'
import PageTabs from '@/components/page-tabs'
import WithLoading from '@/components/with-loading'
import { assetTypes } from '@/data/asset-types'
import { assetsNavData } from '@/data/nav-data'
import { LayoutContext } from '@/layouts/layout/layout'
import { getLibraryData } from '@/lib/github'
import { getProcessedMdxSource } from '@/utils/mdx'
import { getAssetTabs, getAssetType } from '@/utils/schema'
import { createUrl } from '@/utils/string'

import styles from './[tab].module.scss'

const AssetTabPage = ({ source, tabs, assetData }) => {
  const [pageNavItems, setPageNavItems] = useState([])
  const frontmatter = source.compiledSource?.data?.matter || {}
  const { title, description, keywords } = frontmatter

  const { setPrimaryNavData } = useContext(LayoutContext)
  const contentRef = useRef(null)

  useEffect(() => {
    const anchorLinks = Array.from(document.querySelectorAll('[data-anchor-link=true')).map(
      (anchor) => {
        return {
          title: anchor.text,
          id: anchor.attributes.href.value.substring(1)
        }
      }
    )
    setPageNavItems(anchorLinks)
  }, [])

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
    <div ref={contentRef}>
      <Grid>
        <Column sm={4} md={8} lg={{ span: 12, offset: 4 }}>
          {
            <PageHeader
              title={title ?? assetData.content.name}
              withTabs
              bgColor={assetTypes[assetData.content.type]?.bgColor}
              pictogram={assetTypes[assetData.content.type]?.icon}
            />
          }
          <PageBreadcrumb items={breadcrumbItems} />
        </Column>
        <Column sm={4} md={8} lg={{ start: 5, span: 12 }}>
          {tabs && <PageTabs className={styles['asset-tabs']} tabs={tabs} />}
        </Column>
        <Column sm={4} md={8} lg={4}>
          <PageNav items={pageNavItems} contentRef={contentRef} scrollTopDistance={180} />
        </Column>
        <Column sm={4} md={8} lg={12}>
          <MdxPage
            description={description}
            keywords={keywords}
            mdxError={source.mdxError}
            warnings={source.warnings}
            seoTitle={title ?? `${assetData.content.name} - Usage`}
          >
            {source.compiledSource && (
              <div className={styles['page-content']}>
                <MDXRemote compiledSource={source.compiledSource.value} />
              </div>
            )}
          </MdxPage>
        </Column>
      </Grid>
    </div>
  )
}

export const getStaticProps = async ({ params }) => {
  const libraryData = await getLibraryData(params)

  if (!libraryData || !libraryData.assets || !libraryData.assets.length) {
    return {
      notFound: true
    }
  }

  const [assetData] = libraryData.assets

  let src = ''

  switch (params.tab) {
    case 'accessibility':
      src = assetData.content.docs?.accessibilityPath
      break
    case 'usage':
      src = assetData.content.docs?.usagePath
      break
    case 'style':
      src = assetData.content.docs?.stylePath
      break
    case 'code':
      src = assetData.content.docs?.codePath
      break
  }

  if (!src) {
    return {
      notFound: true
    }
  }

  const carbonYmlDirPath = assetData.response.path.split('/').slice(0, -1).join('/')
  if (!createUrl(src)) {
    src = path.join(carbonYmlDirPath, src)
  }

  const tabMdxSource = await getProcessedMdxSource(params, src)

  const pageTabs = getAssetTabs(assetData)

  return {
    props: {
      source: tabMdxSource,
      tabs: pageTabs,
      assetData
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every hour
    revalidate: 60 * 60 // In seconds
  }
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true
  }
}

export default WithLoading(AssetTabPage)
