/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Column, Grid, Tag } from '@carbon/react'
import { isEmpty } from 'lodash'
import PropTypes from 'prop-types'

import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

import styles from './catalog-filters.module.scss'

const CatalogFilters = ({ filter, availableFilters, onFilter }) => {
  const isLg = useMatchMedia(mediaQueries.lg)

  if (isEmpty(filter)) return null

  return (
    <Grid className={styles.container} condensed={!isLg} narrow={isLg}>
      <Column sm={4} md={8} lg={12}>
        <div className={styles.section}>
          {Object.keys(filter).map((item) =>
            filter[item].map((key, i) => (
              <Tag key={i} filter onClick={() => onFilter(item, key, 'remove')}>
                {availableFilters[item].values[key].name}
              </Tag>
            ))
          )}
        </div>
      </Column>
    </Grid>
  )
}

CatalogFilters.propTypes = {
  availableFilters: PropTypes.object,
  filter: PropTypes.object,
  onFilter: PropTypes.func
}

export default CatalogFilters
