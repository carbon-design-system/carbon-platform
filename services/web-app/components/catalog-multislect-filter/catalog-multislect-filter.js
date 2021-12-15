/* eslint-disable no-unused-vars */
/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, OverflowMenu, Popover, PopoverContent, Tag } from '@carbon/react'
import { ChevronDown, ChevronUp, Close, Filter, OverflowMenuHorizontal } from '@carbon/react/icons'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'

import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'
import { useOutsideClick } from '@/utils/use-outside-click'

import styles from './catalog-multiselect-filter.module.scss'

const CatalogMultiselectFilter = ({ onSelect }) => {
  const [activeSelected, setActiveSelected] = useState([])
  const [triggerMultiselect, setTriggerMultiselect] = useState(false)
  const [triggerOverflow, setTriggerOverflow] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [height, setHeight] = useState(0)
  const isMd = useMatchMedia(mediaQueries.md)
  const isLg = useMatchMedia(mediaQueries.lg)

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll)
    return () => window.removeEventListener('scroll', listenToScroll)
  })

  const listenToScroll = () => {
    const heightToHideFrom = 100
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop
    setHeight(winScroll)

    if (winScroll > heightToHideFrom) {
      isVisible && setIsVisible(false)
    } else {
      setIsVisible(true)
    }
  }

  let numVisible

  if (isLg) {
    numVisible = 9
  } else if (isMd) {
    numVisible = 4
  } else {
    numVisible = 2
  }

  const ref = useRef()

  useOutsideClick(ref, () => {
    if (triggerMultiselect) setTriggerMultiselect(false)
  })

  const handleSelect = (selectedFilter) => {
    if (activeSelected.includes(selectedFilter.label)) {
      setActiveSelected((filters) => [
        ...filters.filter((filter) => filter !== selectedFilter.label)
      ])
    } else {
      setActiveSelected((filters) => [...filters, selectedFilter.label])
    }

    if (selectedFilter) {
      onSelect([...activeSelected, selectedFilter.label])
    }
  }

  const handleRemoveItem = (event) => {
    const updateResult = [...activeSelected]
    updateResult.splice(updateResult.indexOf(event), 1)
    setActiveSelected(updateResult)
    onSelect(updateResult)
  }

  const handleRemoveAll = () => {
    const updateResult = []
    setActiveSelected(updateResult)
    onSelect(updateResult)
  }

  const filterTags = [
    {
      title: 'Sponsor',
      options: [
        { label: 'Carbon Core' },
        { label: 'AI Apps' },
        { label: 'Cloud' },
        { label: 'Ibm.com' },
        { label: 'Security' },
        { label: 'Systems' },
        { label: 'Watson Health' }
      ]
    },
    {
      title: 'Status',
      options: [
        { label: 'Draft' },
        { label: 'Deprecated' },
        { label: 'Experimental' },
        { label: 'Stable' },
        { label: 'Sunsetting' }
      ]
    },
    {
      title: 'Framework',
      options: [
        { label: 'Angular' },
        { label: 'React' },
        { label: 'React Native' },
        { label: 'Svelte' },
        { label: 'Vanilla' },
        { label: 'Vue' }
      ]
    },
    {
      title: 'Design Kits',
      options: [
        { label: 'Adobe Illustrator' },
        { label: 'Adobe XD' },
        { label: 'Axure' },
        { label: 'Figma' },
        { label: 'Famers' },
        { label: 'Sketch' }
      ]
    },
    {
      title: 'Platform',
      options: [{ label: 'Android' }, { label: 'Desktop' }, { label: 'Web' }, { label: 'iOS' }]
    },
    {
      title: 'Subtype',
      options: [
        { label: 'Alerts' },
        { label: 'Basic Inputs' },
        { label: 'Content' },
        { label: 'Navigation' },
        { label: 'Pickers' },
        { label: 'Progress & Validation' },
        { label: 'Surfaces' }
      ]
    }
  ]

  const filterTag = filterTags.length
    ? filterTags.map(({ title, options, key }) => (
        <div className={styles.dropdown} key={key} ref={ref}>
          <div className={styles.fitlerTitle}>{title}</div>
          {options.map((selectedFilter, i) => (
            <button
              type="button"
              key={key}
              id={i}
              onClick={() => {
                handleSelect(selectedFilter)
              }}
              className={clsx(
                styles.filterTag,
                activeSelected.includes(selectedFilter.label) ? styles.tagSelected : styles.tag
              )}
            >
              {selectedFilter.label}
            </button>
          ))}
        </div>
    ))
    : null

  const overflowTags = activeSelected.slice(numVisible).map((item, i) => (
      <div
        className={styles.overflowTag}
        key={i}
      >
        {item}
      <Close className={styles.closeIcon} size={16} onClick={() => {
        handleRemoveItem(item)
      }}/>
      </div>
  ))

  const selectedTags = activeSelected.length
    ? (
    <>
      {activeSelected.slice(0, numVisible).map((item, i) => (
        <Tag
          key={i}
          filter
          onClick={() => {
            handleRemoveItem(item)
          }}
        >
          {item}
        </Tag>
      ))}
      {activeSelected.length > numVisible && (
        <div title={activeSelected.length - numVisible + ' more'} className={styles.overflowTagContainer}>
          {activeSelected.length - numVisible + ' more'}
          <OverflowMenu
            flipped
            renderIcon={OverflowMenuHorizontal}
            onClick={() => {
              setTriggerOverflow(!triggerOverflow)
            }}
            className={clsx(styles.overflowSvg, !isVisible ? styles.hidden : null)}
          >
            {overflowTags}
          </OverflowMenu>
        </div>
      )}
    </>
      )
    : null

  return (
    <>
      <Column sm={1} md={4} lg={4}>
        <Popover
          className={styles.container}
          onClick={() => {
            setTriggerMultiselect(!triggerMultiselect)
          }}
        >
          {isMd || isLg
            ? (
            <div className={styles.multiselect} ref={ref}>
              <Tag
                className={styles.tagCount}
                filter
                onClick={() => {
                  handleRemoveAll()
                }}
              >
                {activeSelected.length}
              </Tag>
              {'Filters'}
              {triggerMultiselect
                ? (
                <ChevronDown className={styles.chevron} size={16} />
                  )
                : (
                <ChevronUp className={styles.chevron} size={16} />
                  )}
            </div>
              )
            : <Filter size={16} ref={ref} />
          }
        </Popover>
      </Column>
      {triggerMultiselect
        ? (
        <Column sm={4} md={8} lg={12}>
          <PopoverContent ref={ref} className={styles.dropdownContainer}>
            {filterTag}
          </PopoverContent>
        </Column>
          )
        : (
        <Column sm={0} md={8} lg={12}>
          <div className={clsx(styles.selectedTagsContainer, !isVisible ? styles.hidden : null)}>
            {selectedTags}
          </div>{' '}
        </Column>
          )}
    </>
  )
}

export default CatalogMultiselectFilter
