/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Button, Column, Dropdown, Grid, Layer, Theme } from '@carbon/react'
import { Grid as GridIcon, List as ListIcon } from '@carbon/react/icons'
import clsx from 'clsx'
import { useCallback, useEffect, useRef, useState } from 'react'

import useEventListener from '@/utils/use-event-listener'
import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

import styles from './catalog-sort.module.scss'

const CatalogSort = ({ onSort, onView, sort, view }) => {
  const isMd = useMatchMedia(mediaQueries.md)
  const containerRef = useRef(null)
  const [isSticky, setIsSticky] = useState(false)

  const sortItems = [
    {
      id: 'a-z',
      text: 'A–Z'
    },
    {
      id: 'status',
      text: 'Status'
    }
  ]

  // Conditionally add a drop shadow through JavaScript because `position:sticky` doesn't support a
  // `::stuck` pseudo-class to trigger the drop shadow. Header (48) + spacer (16) + search (48) =
  // 112.
  const scrollHandler = useCallback(() => {
    if (containerRef.current && typeof window !== 'undefined') {
      setIsSticky(containerRef.current.getBoundingClientRect().top === 112)
    }
  }, [])

  useEventListener('scroll', scrollHandler)
  useEffect(() => {
    scrollHandler()
  }, [scrollHandler])

  return (
    <div className={clsx(styles.container, isSticky && styles.containerSticky)} ref={containerRef}>
      <Theme theme="white">
        <Layer>
          <Grid className={styles.grid} condensed={!isMd} narrow={isMd}>
            <Column className={styles.column} sm={4} md={8} lg={4}>
              <Dropdown
                id="catalog-sort"
                className={styles.dropdown}
                initialSelectedItem={sortItems.find((item) => item.id === sort)}
                items={sortItems}
                itemToString={(item) => (item ? item.text : '')}
                onChange={({ selectedItem }) => {
                  onSort(selectedItem.id)
                }}
                type="inline"
                titleText="Sort by:"
                label="A–Z"
                size="lg"
              />
            </Column>
            <Column className={`${styles.column} ${styles.columnSwitcher}`} lg={8}>
              <div className={styles.switcher}>
                <Button
                  className={view === 'grid' ? styles.selected : null}
                  size="lg"
                  kind="ghost"
                  renderIcon={GridIcon}
                  iconDescription="Grid view"
                  hasIconOnly
                  onClick={() => {
                    onView('grid')
                  }}
                />
                <Button
                  className={view === 'list' ? styles.selected : null}
                  size="lg"
                  kind="ghost"
                  renderIcon={ListIcon}
                  iconDescription="List view"
                  hasIconOnly
                  onClick={() => {
                    onView('list')
                  }}
                />
              </div>
            </Column>
          </Grid>
        </Layer>
      </Theme>
    </div>
  )
}

export default CatalogSort
