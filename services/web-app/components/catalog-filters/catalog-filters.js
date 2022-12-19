/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Column, Grid, Tag as CarbonTag } from '@carbon/react'
import isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types'
import { useCallback } from 'react'

import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

import styles from './catalog-filters.module.scss'

const Tag = ({ item, filterKey, name, onClick }) => {
  const handleTagClick = useCallback(() => {
    return onClick(item, filterKey, 'remove')
  }, [item, filterKey, onClick])

  return (
    <CarbonTag filter onClick={handleTagClick}>
      {name}
    </CarbonTag>
  )
}

const CatalogFilters = ({ availableFilters = {}, filter = {}, onFilter }) => {
  const isLg = useMatchMedia(mediaQueries.lg)

  if (isEmpty(filter)) return null

  return (
    <Grid className={styles.container} condensed={!isLg} narrow={isLg}>
      <Column sm={4} md={8} lg={12}>
        <div className={styles.section}>
          {Object.keys(filter).map((item) =>
            filter[item].map((filterKey) => {
              return (
                <Tag
                  item={item}
                  key={filterKey}
                  filterKey={filterKey}
                  name={availableFilters[item].values[filterKey].name}
                  onClick={onFilter}
                />
              )
            })
          )}
        </div>
      </Column>
    </Grid>
  )
}

CatalogFilters.defaultProps = {
  availableFilters: {},
  filter: {}
}

CatalogFilters.propTypes = {
  /**
   * Object containing all keys and  name/values of possible filters
   */
  availableFilters: PropTypes.object,
  /**
   * Object containing key/value(array) of currently applied filters
   */
  filter: PropTypes.object.isRequired,
  /**
   * (item, key, action) => void
   * function to handle filters changes (add/remove key, clear all)
   */
  onFilter: PropTypes.func.isRequired
}

export default CatalogFilters
