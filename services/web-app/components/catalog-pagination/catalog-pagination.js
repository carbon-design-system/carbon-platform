/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid, Layer, Pagination, Theme } from '@carbon/react'

import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

import styles from './catalog-pagination.module.scss'

const CatalogPagination = ({
  assets = [],
  page: currentPage,
  pageSize: currentPageSize,
  setPage,
  setPageSize
}) => {
  const isMd = useMatchMedia(mediaQueries.md)

  return (
    <Theme className={styles.container} theme="white">
      <Layer>
        <Grid condensed={!isMd} narrow={isMd}>
          <Column className={styles.column} sm={4} md={8} lg={12}>
            <Pagination
              onChange={({ page, pageSize }) => {
                if (pageSize !== currentPageSize) {
                  setPageSize(pageSize)
                } else {
                  setPage(page)
                }
              }}
              page={currentPage}
              pageSize={currentPageSize}
              pageSizes={[12, 24, 48, 96]}
              totalItems={assets.length}
            />
          </Column>
        </Grid>
      </Layer>
    </Theme>
  )
}

export default CatalogPagination
