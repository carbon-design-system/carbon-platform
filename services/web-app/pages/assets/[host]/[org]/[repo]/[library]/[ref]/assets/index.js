/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {
  Column,
  DataTable,
  Dropdown,
  Grid,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow
} from '@carbon/react'
import { get } from 'lodash'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { useState } from 'react'
import { libraryPropTypes, paramsPropTypes } from 'types'

import PageHeader from '@/components/page-header'
import { framework } from '@/data/framework'
import { ALPHABETICAL_ORDER, sortItems } from '@/data/sort'
import { getLibraryData } from '@/lib/github'
import pageStyles from '@/pages/pages.module.scss'
import { assetSortComparator } from '@/utils/schema'
import { getSlug } from '@/utils/slug'

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

  // TODO: useEffect assets, sort, keep rows separate, visuals on table,
  // link on table, margin bottom of table,
  // convert values, truncate
  const assets = libraryData.assets.sort(assetSortComparator(sort)).map((asset) => {
    const assetRow = {
      id: asset.content.id,
      name: asset.content.name,
      type: asset.content.type,
      status: get(asset, 'content.status.key', asset.content.status),
      tags: asset.content.tags.join('; '),
      link: (
        <Link href={`/assets/${asset.params.library}/${params.ref}/${getSlug(asset.content)}`}>
          <a>-&gt;</a>
        </Link>
      )
    }
    if (asset.content.framework === framework['design-only']) {
      assetRow.type = [assetRow.type, framework['design-only'].name].join(', ')
    }
    return assetRow
  })

  const onSort = (sortOrder) => setSort(sortOrder)

  return (
    <>
      <NextSeo {...seo} />
      <Grid>
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
          <Grid>
            <Column className={styles.sortColumn} sm={4} md={8} lg={4}>
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
                    {rows.map((row) => (
                      <TableRow key={row.id}>
                        {row.cells.map((cell) => (
                          <TableCell key={cell.id}>{cell.value}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </DataTable>
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
