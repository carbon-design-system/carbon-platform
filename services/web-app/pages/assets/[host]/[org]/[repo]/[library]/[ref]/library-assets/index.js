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
import { useContext, useEffect, useState } from 'react'
import { libraryPropTypes, paramsPropTypes, secondaryNavDataPropTypes } from 'types'

import CatalogItemMeta from '@/components/catalog-item/catalog-item-meta'
import PageHeader from '@/components/page-header'
import TypeTag from '@/components/type-tag'
import { framework } from '@/data/framework'
import { assetsNavData } from '@/data/nav-data'
import { ALPHABETICAL_ORDER, sortItems } from '@/data/sort'
import { LayoutContext } from '@/layouts/layout'
import { getLibraryData, getLibraryNavData } from '@/lib/github'
import pageStyles from '@/pages/pages.module.scss'
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
  const router = useRouter()

  useEffect(() => {
    setPrimaryNavData(assetsNavData)
    setSecondaryNavData(navData)
  }, [setPrimaryNavData, navData, setSecondaryNavData])

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
    title: 'Library assets',
    description
  }

  const allTags = getAllTags()

  const assets =
    libraryData.assets?.sort(assetSortComparator(sort)).map((asset) => {
      const assetRow = {
        id: asset.content.id,
        name: <span className={styles['asset-name']}>{asset.content.name}</span>,
        type: <TypeTag type={asset.content.type} className={styles.tag} />,
        status: <CatalogItemMeta asset={asset} properties={['status']} />,
        tags: (
          <span className={styles['truncated-text']}>
            {asset.content.tags
              .map((tag) => allTags[tag]?.name)
              .join('; ')
              .replaceAll('-', '‑')}
          </span>
        ),
        link: (
          <Link href={`/assets/${asset.params.library}/${params.ref}/${getSlug(asset.content)}`}>
            <a className={styles['row-anchor']}>
              <ArrowRight size={16} className={styles['arrow-icon']} />
            </a>
          </Link>
        )
      }
      if (asset.content.framework === framework['design-only']) {
        assetRow.type = (
          <div style={{ display: 'flex' }}>
            <TypeTag type={asset.content.type} className={styles.tag} />
            <TypeTag type={'design-only'} className={clsx(styles['design-tag'], styles.tag)} />
          </div>
        )
      }
      return assetRow
    }) ?? []

  const onSort = (sortOrder) => setSort(sortOrder)

  return (
    <>
      <NextSeo {...seo} />
      <Grid className={styles['library-assets-container']}>
        <Column sm={4} md={8} lg={12}>
          <PageHeader title={seo.title} />
        </Column>
        <Column sm={4} md={8} lg={12}>
          <Grid>
            <Column sm={4} md={8} lg={8}>
              <h2 className={styles.subheading}>{description}</h2>
            </Column>
          </Grid>
          <Grid condensed={!isLg} narrow={isLg}>
            <Column className={styles['sort-column']} sm={4} md={4} lg={4}>
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
                                <h2 className={styles['no-results-heading']}>
                                  No assets in library.
                                </h2>
                                <h3 className={styles['no-results-subheading']}>
                                  This library does not contain any assets.
                                </h3>
                                {/* library maintainers should be a link but leaving as text for
                                  now until we figure out contributors discussion */}
                                <h3 className={styles['no-results-subheading']}>
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
  navData: secondaryNavDataPropTypes,
  params: paramsPropTypes
}

export const getServerSideProps = async ({ params }) => {
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
    }
  }
}

export default LibrayAssets