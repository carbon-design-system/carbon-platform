/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Column, Grid, Tag } from '@carbon/react'

import styles from './catalog-filters.module.scss'

/**
 * @todo (1) events, (2) show overflow, (3) overflow popup
 */
const CatalogFilters = () => {
  const handleRemoveItem = (item) => {
    console.log(item)
  }

  return (
    <Grid className={styles.container} narrow>
      <Column sm={4} md={8} lg={12}>
        <div className={styles.section}>
          <Tag filter onClick={() => handleRemoveItem('todo')}>
            To do
          </Tag>
          <Tag filter onClick={() => handleRemoveItem('todo')}>
            To do
          </Tag>
        </div>
      </Column>
    </Grid>
  )
}

export default CatalogFilters
