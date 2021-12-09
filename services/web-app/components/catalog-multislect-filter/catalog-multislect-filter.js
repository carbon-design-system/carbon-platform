/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Tag } from '@carbon/react'
import { ChevronDown, ChevronUp, Filter, OverflowMenuHorizontal } from '@carbon/react/icons'
import clsx from 'clsx'
import { useRef, useState } from 'react'

import { mediaQueries, useMatchMedia } from '@/utils/media-query'
import { useOutsideClick } from '@/utils/use-outside-click'

import styles from './catalog-multiselect-filter.module.scss'

const CatalogMultiselectFilter = ({ onSelect }) => {
  const [activeSelected, setActiveSelected] = useState([])
  const [triggerMultiselect, setTriggerMultiselect] = useState(false)
  const [triggerOverflow, setTriggerOverflow] = useState(false)
  const isSm = useMatchMedia(mediaQueries.sm)
  const isMd = useMatchMedia(mediaQueries.md)
  const isLg = useMatchMedia(mediaQueries.lg)

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

  const selectedTag =
    activeSelected.length && isLg
      ? (
      <>
        {activeSelected.slice(0, 9).map((item, i) => (
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
        {activeSelected.length > 9 && (
          <div title={activeSelected.length - 9 + ' more'} className={styles.overflowTag}>
            <div className={styles.overflowTagText}>{activeSelected.length - 9 + ' more'}</div>
            <OverflowMenuHorizontal
              className={styles.overflowSvg}
              onClick={() => {
                setTriggerOverflow(!triggerOverflow)
              }}
              size={16}
            />
          </div>
        )}
      </>
        )
      : isMd
        ? (
      <>
        {activeSelected.slice(0, 4).map((item, i) => (
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
        {activeSelected.length > 4 && (
          <div title={activeSelected.length - 4 + ' more'} className={styles.overflowTag}>
            <div className={styles.overflowTagText}>{activeSelected.length - 4 + ' more'}</div>
            <OverflowMenuHorizontal
              className={styles.overflowSvg}
              onClick={() => {
                setTriggerOverflow(!triggerOverflow)
              }}
              size={16}
            />
          </div>
        )}
      </>
          )
        : isSm
          ? (
      <>
        {activeSelected.slice(0, 2).map((item, i) => (
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
        {activeSelected.length > 2 && (
          <div title={activeSelected.length - 2 + ' more'} className={styles.overflowTag}>
            <div className={styles.overflowTagText}>{activeSelected.length - 2 + ' more'}</div>
            <OverflowMenuHorizontal
              className={styles.overflowSvg}
              onClick={() => {
                setTriggerOverflow(!triggerOverflow)
              }}
              size={16}
            />
          </div>
        )}
      </>
            )
          : null

  return (
    <>
      <Column sm={1} md={4} lg={4}>
        <button
          type="button"
          onClick={() => {
            setTriggerMultiselect(!triggerMultiselect)
          }}
          className={styles.container}
        >
          {isMd || isLg
            ? (
            <div className={styles.multiselect} ref={ref}>
              <Tag
                className={styles.filterCount}
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
            : isSm
              ? (
            <Filter size={16} ref={ref} />
                )
              : null}
        </button>
      </Column>
      <Column className={styles.column} sm={4} md={8} lg={12}>
        {triggerMultiselect
          ? (
          <div ref={ref} className={styles.dropdownContainer}>
            {filterTag}
          </div>
            )
          : (
          <Column className={styles.column} sm={0} md={8} lg={12}>
            <div className={styles.selectedTagContainer}>{selectedTag}</div>{' '}
          </Column>
            )}
        {triggerOverflow ? <div className={styles.placeholderOverflow}>{'hi'}</div> : null}
      </Column>
    </>
  )
}

export default CatalogMultiselectFilter
