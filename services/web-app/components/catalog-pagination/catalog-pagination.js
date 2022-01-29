/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid, Pagination } from '@carbon/react'

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

  /**
   * @todo the Pagination component is missing icons for next page and previous page using the
   * latest `@carbon/react@0.11.0`. This has been reported:
   * {@link https://github.com/carbon-design-system/carbon/discussions/10247}.
   */

  return (
    <Grid className={styles.container} condensed={!isMd} narrow={isMd}>
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
  )
}

export default CatalogPagination
