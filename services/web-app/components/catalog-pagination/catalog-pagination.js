/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid, Pagination } from '@carbon/react'
import PropTypes from 'prop-types'

import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

import styles from './catalog-pagination.module.scss'

const CatalogPagination = ({
  items = [],
  page: currentPage = 1,
  pageSize: currentPageSize = 10,
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
          totalItems={items.length}
          size="lg"
        />
      </Column>
    </Grid>
  )
}

CatalogPagination.defaultProps = {
  items: [],
  page: 1,
  pageSize: 10
}

CatalogPagination.propTypes = {
  /**
   * array of items to display (should take filter into account)
   */
  items: PropTypes.array.isRequired,
  /**
   * Current page number
   */
  page: PropTypes.number.isRequired,
  /**
   * Number of items to display per page
   */
  pageSize: PropTypes.number,
  /**
   * (pageNumber) => void
   * Function to call when new page number option is selected.
   * Should update page passed to props
   */
  setPage: PropTypes.func.isRequired,
  /**
   * (pageSize) => void
   * Function to call when new page size option is selected.
   * Should update pageSize passed to props
   */
  setPageSize: PropTypes.func.isRequired
}

export default CatalogPagination
