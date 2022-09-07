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
import { useCallback, useEffect, useRef, useState } from 'react'

import useEventListener from '@/utils/use-event-listener'
import useFocus from '@/utils/use-focus'
import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'
import useOnKey from '@/utils/use-on-key'
import useOutsideClick from '@/utils/use-outside-click'

import styles from './catalog-multiselect-filter.module.scss'

const CatalogMultiselectFilter = ({
  availableFilters = {},
  className: customClassName,
  filter = {},
  onFilter
}) => {
  const isLg = useMatchMedia(mediaQueries.lg)
  const isMd = useMatchMedia(mediaQueries.md)
  const triggerRef = useRef()
  const contentRef = useRef()
  const popoverRef = useRef(null)
  const focus = useFocus()

  const [open, setOpen] = useState(false)

  useOnKey('Escape', () => {
    setOpen(false)
  })

  useOutsideClick(contentRef, (e) => {
    if (triggerRef.current && !triggerRef.current.contains(e.target)) {
      setOpen(false)
    }
  })

  const resizeHandler = useCallback(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.style.setProperty('--page-height', window.innerHeight + 'px')
    }
  }, [])

  useEventListener('resize', resizeHandler)
  useEffect(() => {
    resizeHandler()
  }, [resizeHandler])

  let columns = 1
  if (isMd) columns = 2
  if (isLg) columns = 3

  const count = Object.keys(filter).reduce((sum, item) => {
    return sum + filter[item].length
  }, 0)

  return (
    <Popover
      align="bottom-right"
      caret={false}
      className={clsx(styles.container, customClassName)}
      dropShadow={true}
      highContrast={false}
      open={open}
    >
      <button
        className={styles.trigger}
        onClick={() => {
          setOpen(!open)
          focus(popoverRef)
        }}
        ref={triggerRef}
        type="button"
      >
        <span className={styles['trigger-inner']}>
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
              <span className={styles['trigger-text']}>Filters</span>
              <ChevronDown
                className={clsx(styles.icon, open && styles['icon--rotate'])}
                size={16}
              />
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
        {/* div wrapper added to receive focus */}
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- TODO: add role */}
        <div className={styles.wrapper} ref={popoverRef} tabIndex="0">
          <Column span={columns}>
            <Grid className={styles.grid} condensed>
              {Object.keys(availableFilters).map((item, i) => (
                <Column className={styles.column} key={i} sm={1}>
                  <h3 className={styles.heading}>{availableFilters[item].name}</h3>
                  <ul className={styles.list}>
                    {Object.keys(availableFilters[item].values).map((key, j) => (
                      <li className={styles['list-item']} key={j}>
                        <Tag
                          onClick={() => {
                            onFilter(
                              item,
                              key,
                              filter[item] && filter[item].includes(key) ? 'remove' : 'add'
                            )
                          }}
                          type={
                            filter[item] && filter[item].includes(key) ? 'high-contrast' : 'gray'
                          }
                        >
                          {availableFilters[item].values[key].name}
                        </Tag>
                      </li>
                    ))}
                  </ul>
                </Column>
              ))}
            </Grid>
          </Column>
        </div>
      </PopoverContent>
    </Popover>
  )
}

CatalogMultiselectFilter.defaultProps = {
  availableFilters: {},
  filter: {}
}

CatalogMultiselectFilter.propTypes = {
  /**
   * Object containing all keys and  name/values of possible filters
   */
  availableFilters: PropTypes.object,
  /**
   * Optional container class name.
   */
  className: PropTypes.string,
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

export default CatalogMultiselectFilter
