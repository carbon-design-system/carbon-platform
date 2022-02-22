/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Dropdown, Grid, IconButton } from '@carbon/react'
import { Grid as GridIcon, List as ListIcon } from '@carbon/react/icons'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { useCallback, useEffect, useRef, useState } from 'react'

import useEventListener from '@/utils/use-event-listener'

import styles from './catalog-sort.module.scss'

const CatalogSort = ({ onSort, onView, sort, view }) => {
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
      <Grid className={styles.grid} condensed>
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
            <IconButton
              className={clsx(styles.button, view === 'grid' && styles.selected)}
              kind="ghost"
              label="Grid view"
              onClick={() => {
                onView('grid')
              }}
              size="lg"
            >
              <GridIcon size={20} />
            </IconButton>
            <IconButton
              className={clsx(styles.button, view === 'list' && styles.selected)}
              kind="ghost"
              label="List view"
              onClick={() => {
                onView('list')
              }}
              size="lg"
            >
              <ListIcon size={20} />
            </IconButton>
          </div>
        </Column>
      </Grid>
    </div>
  )
}

CatalogSort.propTypes = {
  onSort: PropTypes.func,
  onView: PropTypes.func,
  sort: PropTypes.oneOf(['a-z', 'status']),
  view: PropTypes.oneOf(['grid', 'list'])
}

export default CatalogSort
