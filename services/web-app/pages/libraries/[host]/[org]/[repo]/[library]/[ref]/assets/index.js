/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {
  Column,
  DataTable,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow
} from '@carbon/react'
import { ArrowRight } from '@carbon/react/icons'
import { FilingCabinet } from '@carbon-platform/icons'
import { H2, H3 } from '@carbon-platform/mdx-components'
import clsx from 'clsx'
import { NextSeo } from 'next-seo'
import { useCallback, useContext, useEffect, useState } from 'react'

import AssetCatalogItemMeta from '@/components/asset-catalog-item/asset-catalog-item-meta'
import ContentWrapper from '@/components/content-wrapper'
import PageHeader from '@/components/page-header'
import SortByDropdown from '@/components/sort-by-dropdown'
import TypeTag from '@/components/type-tag'
import withLoading from '@/components/with-loading'
import { assetsNavData } from '@/data/nav-data'
import { pageHeaders } from '@/data/page-headers'
import { ALPHABETICAL_ORDER, sortItems } from '@/data/sort'
import { LayoutContext } from '@/layouts/layout'
import { getLibraryData, getLibraryNavData } from '@/lib/github'
import { libraryPropTypes, paramsPropTypes, secondaryNavDataPropTypes } from '@/types'
import { assetSortComparator } from '@/utils/schema'
import { getAllTags } from '@/utils/schema.js'
import { getSlug } from '@/utils/slug'
import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

import styles from './index.module.scss'

const headerData = [
  {
    key: 'name',
    header: 'Asset'
  },
  {
    key: 'type',
    header: 'Type'
  },
  {
    key: 'tags',
    header: 'Tags'
  },
  {
    key: 'status',
    header: 'Status'
  },
  {
    key: 'link',
    header: ''
  }
]

const LibrayAssets = ({ libraryData, params, navData }) => {
  const { setPrimaryNavData, setSecondaryNavData } = useContext(LayoutContext)
  const isLg = useMatchMedia(mediaQueries.lg)

  const [sort, setSort] = useState(ALPHABETICAL_ORDER)

  useEffect(() => {
    setPrimaryNavData(assetsNavData)
    setSecondaryNavData(navData)
  }, [setPrimaryNavData, navData, setSecondaryNavData])

  const { description } = libraryData.content

  const pageHeader = pageHeaders?.library ?? {}

  const seo = {
    title: 'Assets',
    description
  }

  const allTags = getAllTags()

  const getTagStr = (tags = []) => {
    if (!tags || !tags.length) {
      return '–'
    }

    return tags.map((tag) => allTags[tag]?.name).join(', ')
  }

  const assets =
    libraryData.assets?.sort(assetSortComparator(sort)).map((asset) => {
      const assetRow = {
        id: asset.content.id,
        name: <span className={styles['asset-name']}>{asset.content.name}</span>,
        type: <TypeTag type={asset.content.type} className={styles.tag} />,
        status: (
          <AssetCatalogItemMeta asset={asset} properties={['status']} className={styles.status} />
        ),
        tags: <span className={styles['truncated-text']}>{getTagStr(asset?.content?.tags)}</span>,
        link: (
          <a
            className={styles['row-anchor']}
            href={`/libraries/${asset.params.library}/${params.ref}/assets/${getSlug(
              asset.content
            )}`}
          >
            <ArrowRight size={16} className={styles['arrow-icon']} />
          </a>
        )
      }
      if (asset.content.framework === 'design-only') {
        assetRow.type = (
          <div style={{ display: 'flex' }}>
            <TypeTag type={asset.content.type} className={styles.tag} />
            <TypeTag name="Design only" className={clsx(styles['design-tag'], styles.tag)} />
          </div>
        )
      }
      return assetRow
    }) ?? []

  const onSort = useCallback((sortOrder) => setSort(sortOrder), [setSort])

  return (
    <>
      <NextSeo {...seo} />
      <Grid className={styles['library-assets-container']}>
        <Column sm={4} md={8} lg={12}>
          <PageHeader
            bgColor={pageHeader?.bgColor}
            title={seo.title}
            pictogram={pageHeader?.icon}
          />
        </Column>
        <Column sm={4} md={8} lg={12}>
          <ContentWrapper>
            <Grid>
              <Column sm={4} md={8} lg={8}>
                <H2 headingClassName={styles.subheading}>{description}</H2>
              </Column>
            </Grid>
            <Grid condensed={!isLg} narrow={isLg}>
              <Column className={styles['sort-column']} sm={4} md={4} lg={4}>
                <SortByDropdown
                  onSort={onSort}
                  sortOptions={sortItems}
                  defaultSortIndex={0}
                  sortId={sort}
                />
              </Column>
            </Grid>
            <Grid condensed={!isLg} narrow={isLg} className={styles.container}>
              <Column sm={4} md={8} lg={12}>
                <DataTable rows={assets} headers={headerData}>
                  {({ rows, headers, getHeaderProps, getTableProps }) => (
                    <TableContainer>
                      <Table {...getTableProps()}>
                        <TableHead>
                          <TableRow>
                            {headers.map((header) => (
                              <TableHeader {...getHeaderProps({ header })} key={header.id}>
                                {header.header}
                              </TableHeader>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.length > 0 &&
                            rows.map((row) => (
                              <TableRow key={row.id} className={styles['asset-row']}>
                                {row.cells.map((cell) => (
                                  <TableCell key={cell.id}>{cell.value}</TableCell>
                                ))}
                              </TableRow>
                            ))}
                          {rows.length <= 0 && (
                            <TableRow>
                              <TableCell colSpan={5}>
                                <div className={styles['no-results-container']}>
                                  <FilingCabinet />
                                  <H2
                                    narrow
                                    className={styles['h2-container']}
                                    headingClassName={styles['no-results-heading']}
                                  >
                                    No assets in library.
                                  </H2>
                                  <H3
                                    narrow
                                    className={styles['h3-container']}
                                    headingClassName={styles['no-results-subheading']}
                                  >
                                    This library does not contain any assets.
                                  </H3>
                                  {/* library maintainers should be a link but leaving as text for
                                now until we figure out contributors discussion */}
                                  <H3
                                    narrow
                                    className={styles['h3-container']}
                                    headingClassName={styles['no-results-subheading']}
                                  >
                                    Contact library maintainers for further details.
                                  </H3>
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                </DataTable>
              </Column>
            </Grid>
          </ContentWrapper>
        </Column>
      </Grid>
    </>
  )
}

LibrayAssets.propTypes = {
  libraryData: libraryPropTypes,
  navData: secondaryNavDataPropTypes,
  params: paramsPropTypes
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

export default withLoading(LibrayAssets, {
  pageHeader: { bgColor: pageHeaders?.library?.bgColor }
})
