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

import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'
import useOutsideClick from '@/utils/use-outside-click'

import styles from './catalog-multiselect-filter.module.scss'

/**
 * @todo close popover on escape key
 * @todo events
 */
const CatalogMultiselectFilter = ({ className: customClassName, onSelect }) => {
  const [open, setOpen] = useState(false)
  const [count] = useState(2)
  const isMd = useMatchMedia(mediaQueries.md)
  const triggerRef = useRef()
  const contentRef = useRef()

  useOutsideClick(contentRef, (e) => {
    if (triggerRef.current && !triggerRef.current.contains(e.target)) {
      setOpen(false)
    }
  })

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
        To do
      </PopoverContent>
    </Popover>
  )
}

export default CatalogMultiselectFilter
