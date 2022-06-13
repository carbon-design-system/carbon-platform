/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'
import clsx from 'clsx'
import PropTypes from 'prop-types'

import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

import styles from './catalog-list.module.scss'

const CatalogList = ({
  itemsCounts,
  items,
  itemPluralName,
  filter = {},
  isGrid = false,
  page = 1,
  pageSize = 10,
  renderItem
}) => {
  const isLg = useMatchMedia(mediaQueries.lg)
  const isLgGrid = isGrid && isLg

  const start = (page - 1) * pageSize
  const end = start + pageSize

  const itemsToRender = items.slice(start, end)

  return (
    <Grid
      as="ul"
      className={clsx(styles.container, isLgGrid && styles['container--grid'])}
      condensed={!isLg}
      narrow={isLg}
    >
      {itemsToRender.map((item, i) => renderItem(item, i, itemsCounts, filter, isGrid && isLg))}
      {(!itemsToRender || itemsToRender.length === 0) && (
        <Column
          className={clsx(styles.copy, isLgGrid && styles['copy--grid'])}
          sm={4}
          md={8}
          lg={12}
        >
          <h2 className={styles.heading}>No results found</h2>
          <p className={styles.paragraph}>
            {`It appears we don't have any ${itemPluralName} that match your search. Try different search terms.`}
          </p>
        </Column>
      )}
    </Grid>
  )
}

CatalogList.propTypes = {
  filter: PropTypes.object,
  isGrid: PropTypes.bool,
  itemPluralName: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  itemsCounts: PropTypes.object.isRequired,
  page: PropTypes.number,
  pageSize: PropTypes.number,
  renderItem: PropTypes.func
}

export default CatalogList
