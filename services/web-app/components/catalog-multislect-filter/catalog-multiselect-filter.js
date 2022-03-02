/* eslint-disable no-unused-vars */
/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid, Popover, PopoverContent, Tag } from '@carbon/react'
import { ChevronDown, Close, Filter } from '@carbon/react/icons'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'

import { getFilters } from '@/data/filters'
import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'
import useOutsideClick from '@/utils/use-outside-click'

import styles from './catalog-multiselect-filter.module.scss'

/**
 * @todo (1) close popover on escape key, (2) move focus to popover on open, (3) update state on
 * close so the modal doesn't close each time you select a new item.
 */
const CatalogMultiselectFilter = ({
  filter,
  initialFilter,
  className: customClassName,
  onFilter
}) => {
  const [open, setOpen] = useState(false)
  const isLg = useMatchMedia(mediaQueries.lg)
  const isMd = useMatchMedia(mediaQueries.md)
  const triggerRef = useRef()
  const contentRef = useRef()

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', handleEsc)

    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [])

  useOutsideClick(contentRef, (e) => {
    if (triggerRef.current && !triggerRef.current.contains(e.target)) {
      setOpen(false)
    }
  })

  let columns = 1
  if (isMd) columns = 2
  if (isLg) columns = 3

  const count = Object.keys(filter).reduce((sum, item) => {
    return sum + filter[item].length
  }, 0)

  const popoverRef = useRef(null)

  const onClickHandler = () => {
    setOpen(!open)
    popoverRef.current.focus()
  }

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
        onClick={() => onClickHandler()}
        ref={triggerRef}
        type="button"
        tabIndex="0"
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
                    onFilter(null, null, 'all')
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
        <div className={styles.divTest} ref={popoverRef}>
          <Grid className={styles.grid} columns={columns}>
            {Object.keys(getFilters(initialFilter)).map((item, i) => (
              <Column className={styles.column} key={i}>
                <h3 className={styles.heading}>{getFilters(initialFilter)[item].name}</h3>
                <ul className={styles.list}>
                  {Object.keys(getFilters(initialFilter)[item].values).map((key, j) => (
                    <li className={styles.listItem} key={j}>
                      <Tag
                        onClick={() => {
                          onFilter(
                            item,
                            key,
                            filter[item] && filter[item].includes(key) ? 'remove' : 'add'
                          )
                        }}
                        type={filter[item] && filter[item].includes(key) ? 'high-contrast' : 'gray'}
                      >
                        {getFilters(initialFilter)[item].values[key].name}
                      </Tag>
                    </li>
                  ))}
                </ul>
              </Column>
            ))}
          </Grid>
        </div>
      </PopoverContent>
    </Popover>
  )
}

CatalogMultiselectFilter.propTypes = {
  className: PropTypes.string,
  filter: PropTypes.object,
  initialFilter: PropTypes.object,
  onFilter: PropTypes.func
}

export default CatalogMultiselectFilter
