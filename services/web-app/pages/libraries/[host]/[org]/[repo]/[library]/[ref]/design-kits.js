/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Column, Grid, Link as CarbonLink, Tag } from '@carbon/react'
import { RulerAlt } from '@carbon/react/icons'
import { AnchorLink, AnchorLinks } from '@carbon-platform/mdx-components'
import groupBy from 'lodash/groupBy'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { useContext, useEffect } from 'react'

import CardGroup from '@/components/card-group/card-group'
import { H2, P } from '@/components/markdown'
import MdxIcon from '@/components/mdx-icon/mdx-icon'
import PageDescription from '@/components/page-description/page-description'
import PageHeader from '@/components/page-header'
import PageLoading from '@/components/page-loading'
import ResourceCard from '@/components/resource-card/resource-card'
import { designKitTypes } from '@/data/design-kit-types'
import { designTools } from '@/data/design-tools'
import { assetsNavData } from '@/data/nav-data'
import { pageHeaders } from '@/data/page-headers'
import { LayoutContext } from '@/layouts/layout'
import { getLibraryData, getLibraryNavData } from '@/lib/github'

import pageStyles from '../../../../../../pages.module.scss'

const DesignKits = ({ libraryData, navData }) => {
  const { setPrimaryNavData, setSecondaryNavData } = useContext(LayoutContext)
  const router = useRouter()

  const pageHeader = pageHeaders?.library ?? {}

  useEffect(() => {
    setPrimaryNavData(assetsNavData)
    setSecondaryNavData(navData)
  }, [setPrimaryNavData, navData, setSecondaryNavData])

  if (router.isFallback) {
    return (
      <>
        <PageHeader bgColor={pageHeader?.bgColor} loading />
        <PageLoading />
      </>
    )
  }

  const { name } = libraryData.content

  const seo = {
    title: `${name} design kits`
  }

  let groupedDesignKits
  if (libraryData.content.designKits) {
    groupedDesignKits = groupBy(Object.values(libraryData.content.designKits), (kit) => kit.tool)
  }

  let filteredDesignTools
  if (libraryData.content.designKits) {
    filteredDesignTools = Object.keys(designTools).filter((item) =>
      Object.keys(groupedDesignKits).includes(item)
    )
  }

  const NoDesignKits = () => {
    return (
      <>
        <PageDescription>This library contains no compatible design kits.</PageDescription>
        <P>
          It looks like there are no design kits compatible with this library. Explore the design
          kit catalog to find more design kits or contact library maintainers.
        </P>
        <CardGroup>
          <Column sm={4} md={4} lg={4}>
            <ResourceCard subTitle="Design kit catalog" href="/design-kits">
              <RulerAlt size={32} />
            </ResourceCard>
          </Column>
        </CardGroup>
      </>
    )
  }

  return (
    <>
      <NextSeo {...seo} />
      <PageHeader bgColor={pageHeader?.bgColor} title="Design kits" pictogram={pageHeader?.icon} />
      <Grid>
        <Column sm={4} md={8} lg={12}>
          <div className={pageStyles.content}>
            {!libraryData.content.designKits && <NoDesignKits />}
            {libraryData.content.designKits && (
              <>
                <PageDescription>
                  The following design kits are compatible with the {name} library. If you are new
                  to Carbon, check out the{' '}
                  <Link href="/designing/get-started" passHref>
                    <CarbonLink>design guidance</CarbonLink>
                  </Link>{' '}
                  to get started. You can also view all design kits in the{' '}
                  <Link href="/design-kits" passHref>
                    <CarbonLink>catalog</CarbonLink>
                  </Link>
                  .
                </PageDescription>
                {filteredDesignTools.length > 2 && (
                  <AnchorLinks>
                    {filteredDesignTools.map((item, i) => (
                      <AnchorLink key={i}>{designTools?.[item]?.name}</AnchorLink>
                    ))}
                  </AnchorLinks>
                )}
                {filteredDesignTools.map((item, i) => (
                  <>
                    <H2 key={i}> {designTools?.[item]?.name}</H2>
                    <CardGroup>
                      {groupedDesignKits[`${item}`].map((kit, i) => (
                        <Column sm={4} md={4} lg={4} key={i}>
                          <ResourceCard
                            subTitle={kit.name}
                            href={kit.url}
                            component={
                              <Tag type={designKitTypes?.[kit.type]?.tagType}>
                                {designKitTypes?.[kit.type]?.name}
                              </Tag>
                            }
                          >
                            <MdxIcon name={designTools?.[kit.tool]?.mdxIcon} />
                          </ResourceCard>
                        </Column>
                      ))}
                    </CardGroup>
                  </>
                ))}
              </>
            )}
          </div>
        </Column>
      </Grid>
    </>
  )
}

export const getStaticProps = async ({ params }) => {
  const libraryData = await getLibraryData(params)

  if (!libraryData) {
    return {
      notFound: true
    }
  }

  const navData = getLibraryNavData(params, libraryData)

  return {
    props: {
      libraryData,
      navData,
      params
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

export default DesignKits
