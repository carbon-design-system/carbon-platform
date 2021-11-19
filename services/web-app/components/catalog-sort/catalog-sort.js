/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { breakpoints } from '@carbon/layout'
import { Button, Column, Dropdown, Grid, Layer, Theme } from '@carbon/react'
import { Svg32GridLayout, Svg32ListLayout } from '@carbon-platform/icons'
import useMedia from 'use-media'

import styles from './catalog-sort.module.scss'

const CatalogSort = ({ onSort, onView, sort, view }) => {
  const isMobile = useMedia({ maxWidth: breakpoints.md.width })

  const sortOptions = ['A–Z', 'Newest', 'Most used', 'Status']

  return (
    <Theme className={styles.container} theme="white">
      <Layer>
        <Grid className={styles.grid} condensed={isMobile} narrow={!isMobile}>
          <Column className={styles.column} sm={4} md={8} lg={4}>
            <Dropdown
              id="catalog-sort"
              light
              className={styles.dropdown}
              initialSelectedItem={sort}
              items={sortOptions}
              onChange={({ selectedItem }) => {
                onSort(selectedItem)
              }}
              type="inline"
              titleText="Sort by:"
              label="A-Z"
              size="lg"
            />
          </Column>
          <Column className={`${styles.column} ${styles.columnSwitcher}`} lg={8} max={7}>
            <div className={styles.switcher}>
              <Button
                className={view === 'grid' ? styles.selected : null}
                size="lg"
                kind="ghost"
                renderIcon={Svg32GridLayout}
                iconDescription="Grid view"
                hasIconOnly
                onClick={() => {
                  onView('list')
                }}
              />
              <Button
                className={view === 'list' ? styles.selected : null}
                size="lg"
                kind="ghost"
                renderIcon={Svg32ListLayout}
                iconDescription="List view"
                hasIconOnly
                onClick={() => {
                  onView('grid')
                }}
              />
            </div>
          </Column>
        </Grid>
      </Layer>
    </Theme>
  )
}

export default CatalogSort
