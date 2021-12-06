/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Tag } from '@carbon/react'
import { ChevronDown, ChevronUp, OverflowMenuHorizontal } from '@carbon/react/icons'
import { useRef, useState } from 'react'

import { useOutsideClick } from '@/utils/use-outside-click'

import styles from './catalog-multiselect-filter.module.scss'

const CatalogMultiselectFilter = ({ onSelect }) => {
  const [select, setSelect] = useState([])
  const [triggerOverflow, setTriggerOverflow] = useState(false)
  const [triggerMultiselect, setTriggerMultiselect] = useState(false)
  const ref = useRef()

  useOutsideClick(ref, () => {
    if (triggerMultiselect) setTriggerMultiselect(false)
  })

  const handleSelect = (event) => {
    if (event.target.title) {
      setSelect([...select, event.target.title])
      onSelect([...select, event.target.title])
    }
  }

  const handleRemoveItem = (event) => {
    const updateResult = [...select]
    updateResult.splice(updateResult.indexOf(event), 1)
    setSelect(updateResult)
    onSelect(updateResult)
  }

  const handleRemoveAll = () => {
    const updateResult = []
    setSelect(updateResult)
    onSelect(updateResult)
  }

  const filterTags = [
    {
      title: 'Sponsor',
      options: [
        'Carbon Core',
        'AI Apps',
        'Cloud',
        'IBM.com',
        'Security',
        'Systems',
        'Watson Health'
      ]
    },
    {
      title: 'Status',
      options: ['Draft', 'Deprecated', 'Experimental', 'Stable', 'Sunsetting']
    },
    {
      title: 'Framework',
      options: ['Angular', 'React', 'React Native', 'Svelte', 'Vue', 'Vanilla']
    },
    {
      title: 'Design Kits',
      options: ['Adobe Illustrator', 'Axure', 'Adobe XD', 'Figma', 'Sketch', 'Framers']
    },
    {
      title: 'Platform',
      options: ['Android', 'Desktop', 'Web', 'iOS']
    },
    {
      title: 'Subtype',
      options: [
        'Alerts',
        'Basic Inputs',
        'Content',
        'Navigation',
        'Pickers',
        'Progress & Validation'
      ]
    }
  ]

  const filterTag = filterTags.length
    ? filterTags.map(({ title, options, key }) => (
        <div ref={ref} className={styles.dropdown} key={key}>
          <div className={styles.fitlerTitle}>{title}</div>
          <div>
            {options.map((selectedFilter, i) => (
              <Tag className={styles.tag} key={i} onClick={handleSelect}>
                {selectedFilter}
              </Tag>
            ))}
          </div>
        </div>
    ))
    : null

  const selectedTag = select.length
    ? (
    <>
      {select.slice(0, 6).map((item, i) => (
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
      {select.length > 6 && (
        <div title={select.length - 6 + ' more'} className={styles.overflowTag}>
          <div className={styles.overflowTagText}>{select.length - 6 + ' more'}</div>
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
          <div className={styles.input}>
            <Tag
              className={styles.inputText}
              filter
              onClick={() => {
                handleRemoveAll()
              }}
            >
              {select.length}
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
        </button>
      </Column>
      <Column className={styles.column} sm={4} md={8} lg={12}>
        {triggerMultiselect
          ? (
          <div className={styles.dropdownContainer}>{filterTag}</div>
            )
          : (
          <div className={styles.selectedTagContainer}>{selectedTag}</div>
            )}
        {triggerOverflow ? <div className={styles.placeholderOverflow}>{'hi'}</div> : null}
      </Column>
    </>
  )
}

export default CatalogMultiselectFilter
