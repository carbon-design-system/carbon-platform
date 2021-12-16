/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Column, Grid, Tag } from '@carbon/react'
import { isEmpty } from 'lodash'

import { filters } from '@/data/filters'

import styles from './catalog-filters.module.scss'

/**
 * @todo (1) show overflow, (2) overflow popup
 */
const CatalogFilters = ({ filter, onFilter }) => {
  if (isEmpty(filter)) return null

  return (
    <Grid className={styles.container} narrow>
      <Column sm={4} md={8} lg={12}>
        <div className={styles.section}>
          {Object.keys(filter).map((item) =>
            filter[item].map((key, i) => (
              <Tag key={i} filter onClick={() => onFilter(item, key, 'remove')}>
                {filters[item].values[key].name}
              </Tag>
            ))
          )}
        </div>
      </Column>
    </Grid>
  )
}

export default CatalogFilters
