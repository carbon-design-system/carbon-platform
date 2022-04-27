/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid, Pagination } from '@carbon/react'
import PropTypes from 'prop-types'
import { assetPropTypes } from 'types'

import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

import styles from './catalog-pagination.module.scss'

const CatalogPagination = ({
  assets = [],
  page: currentPage,
  pageSize: currentPageSize,
  setPage,
  setPageSize
}) => {
  const isLg = useMatchMedia(mediaQueries.lg)

  return (
    <Grid className={styles.container} condensed={!isLg} narrow={isLg}>
      <Column sm={4} md={8} lg={12}>
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
          pageSizes={[30, 60, 120, 240]}
          totalItems={assets.length}
          size="lg"
        />
      </Column>
    </Grid>
  )
}

CatalogPagination.propTypes = {
  assets: PropTypes.arrayOf(assetPropTypes),
  page: PropTypes.number,
  pageSize: PropTypes.number,
  setPage: PropTypes.func,
  setPageSize: PropTypes.func
}

export default CatalogPagination
