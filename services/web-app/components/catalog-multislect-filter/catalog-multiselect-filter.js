/* eslint-disable no-unused-vars */
/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid, Popover, PopoverContent, Tag } from '@carbon/react'
import { ChevronDown, Close, Filter } from '@carbon/react/icons'
import clsx from 'clsx'
import { useRef, useState } from 'react'

import { filters } from '@/data/filters'
import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'
import useOutsideClick from '@/utils/use-outside-click'

import styles from './catalog-multiselect-filter.module.scss'

/**
 * @todo (1) close popover on escape key, (2) move focus to popover on open, (3) update state on
 * close so the modal doesn't close each time you select a new item
 */
const CatalogMultiselectFilter = ({ filter, className: customClassName, onFilter }) => {
  const [open, setOpen] = useState(false)
  const isLg = useMatchMedia(mediaQueries.lg)
  const isMd = useMatchMedia(mediaQueries.md)
  const triggerRef = useRef()
  const contentRef = useRef()

  useOutsideClick(contentRef, (e) => {
    if (triggerRef.current && !triggerRef.current.contains(e.target)) {
      setOpen(false)
    }
  })

  let columns = 1
  if (isMd) columns = 2
  if (isLg) columns = 3

  const count = Object.keys(filter).reduce((sum, item) => {
    return (sum += filter[item].length)
  }, 0)

  return (
    <Popover
      align="bottom-right"
      caret={false}
      className={clsx(styles.container, customClassName)}
      dropShadow={true}
      highContrast={false}
      light={false}
      open={open}
    >
      <button
        className={styles.trigger}
        onClick={() => setOpen(!open)}
        ref={triggerRef}
        type="button"
      >
        <span className={styles.triggerInner}>
          {isMd && (
            <>
              {count !== 0 && (
                <Tag
                  className={styles.tag}
                  filter
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  type="high-contrast"
                >
                  {count}
                </Tag>
              )}
              <span className={styles.triggerText}>Filters</span>
              <ChevronDown className={clsx(styles.icon, open && styles.iconRotate)} size={16} />
            </>
          )}
          {!isMd && open && <Close size={20} />}
          {!isMd && !open && (
            <>
              <Filter size={20} />
              <span className={styles.count}>{count}</span>
            </>
          )}
        </span>
      </button>
      <PopoverContent className={styles.content} ref={contentRef}>
        <Grid className={styles.grid} columns={columns}>
          {Object.keys(filters).map((item, i) => (
            <Column className={styles.column} key={i}>
              <h3 className={styles.heading}>{filters[item].name}</h3>
              <ul className={styles.list}>
                {Object.keys(filters[item].values).map((key, j) => (
                  <li className={styles.listItem} key={j}>
                    <Tag
                      onClick={() => {
                        onFilter(item, key, 'add')
                      }}
                      type={filter[item] && filter[item].includes(key) && 'high-contrast'}
                    >
                      {filters[item].values[key].name}
                    </Tag>
                  </li>
                ))}
              </ul>
            </Column>
          ))}
        </Grid>
      </PopoverContent>
    </Popover>
  )
}

export default CatalogMultiselectFilter
