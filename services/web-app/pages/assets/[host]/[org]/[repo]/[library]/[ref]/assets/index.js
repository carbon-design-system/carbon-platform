/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {
  Column,
  DataTable,
  Dropdown,
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
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { useState } from 'react'
import { libraryPropTypes, paramsPropTypes } from 'types'

import CatalogItemMeta from '@/components/catalog-item/catalog-item-meta'
import PageHeader from '@/components/page-header'
import TypeTag from '@/components/type-tag'
import { framework } from '@/data/framework'
import { ALPHABETICAL_ORDER, sortItems } from '@/data/sort'
import { getLibraryData } from '@/lib/github'
import pageStyles from '@/pages/pages.module.scss'
import { assetSortComparator } from '@/utils/schema'
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

const LibrayAssets = ({ libraryData, params }) => {
  const isLg = useMatchMedia(mediaQueries.lg)

  const [sort, setSort] = useState(ALPHABETICAL_ORDER)
  const router = useRouter()

  if (router.isFallback) {
    return (
      <Grid>
        <Column sm={4} md={8} lg={16}>
          <div className={pageStyles.content}>
            <h1>Loading...</h1>
          </div>
        </Column>
      </Grid>
    )
  }

  const { description } = libraryData.content

  const seo = {
    title: 'Assets',
    description
  }

  const assets =
    libraryData.assets?.sort(assetSortComparator(sort)).map((asset) => {
      const assetRow = {
        id: asset.content.id,
        name: asset.content.name,
        type: <TypeTag type={asset.content.type} className={styles.tag} />,
        status: <CatalogItemMeta asset={asset} properties={['status']} />,
        tags: <span className={styles.truncatedText}>{asset.content.tags.join('; ')}</span>,
        link: (
          <Link href={`/assets/${asset.params.library}/${params.ref}/${getSlug(asset.content)}`}>
            <a>
              <ArrowRight size={16} />
            </a>
          </Link>
        )
      }
      if (asset.content.framework === framework['design-only']) {
        assetRow.type = (
          <div style={{ display: 'flex' }}>
            <TypeTag type={asset.content.type} className={styles.tag} />
            <TypeTag type={'design-only'} className={clsx(styles.designTag, styles.tag)} />
          </div>
        )
      }
      return assetRow
    }) ?? []

  const onSort = (sortOrder) => setSort(sortOrder)

  return (
    <>
      <NextSeo {...seo} />
      <Grid className={styles.libraryAssetsContainer}>
        <Column sm={4} md={8} lg={{ start: 5, span: 12 }}>
          <PageHeader title={seo.title} />
        </Column>
        <Column sm={4} md={8} lg={4}>
          {/* In page nav  */}
        </Column>
        <Column sm={4} md={8} lg={12}>
          <Grid>
            <Column sm={4} md={8} lg={8}>
              <h2 className={styles.subheading}>{description}</h2>
            </Column>
          </Grid>
          <h2 className={styles.contentHeading}>All library assets</h2>
          <Grid condensed={!isLg} narrow={isLg}>
            <Column className={styles.sortColumn} sm={4} md={4} lg={5}>
              <Dropdown
                id="catalog-sort"
                className={styles.dropdown}
                initialSelectedItem={sortItems.find((item) => item.id === sort)}
                items={sortItems}
                itemToString={(item) => (item ? item.text : '')}
                onChange={({ selectedItem }) => {
                  onSort(selectedItem.id)
                }}
                type="inline"
                titleText="Sort by:"
                label="A–Z"
                size="lg"
              />
            </Column>
          </Grid>
          <Grid condensed={!isLg} narrow={isLg}>
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
                        {/* I can't get this to work */}
                        {/* eslint-disable multiline-ternary */}
                        {rows.length > 0 ? (
                          rows.map((row) => (
                            <TableRow key={row.id} className={styles.assetRow}>
                              {row.cells.map((cell) => (
                                <TableCell key={cell.id}>{cell.value}</TableCell>
                              ))}
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={5}>
                              <div className={styles.noResultsContainer}>
                                <FilingCabinet />
                                <h2 className={styles.noResultsHeading}>No assets in library.</h2>
                                <h3 className={styles.noResultsSubheading}>
                                  This library does not contain any assets.
                                </h3>
                                {/* library maintainers should be a link but leaving as text for
                                  now until we figure out contributors discussion */}
                                <h3 className={styles.noResultsSubheading}>
                                  Contact library maintainers for further details.
                                </h3>
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
        </Column>
      </Grid>
    </>
  )
}

LibrayAssets.propTypes = {
  libraryData: libraryPropTypes,
  params: paramsPropTypes
}

export const getServerSideProps = async ({ params }) => {
  const libraryData = await getLibraryData(params)

  if (!libraryData) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      libraryData,
      params
    }
  }
}

export default LibrayAssets
