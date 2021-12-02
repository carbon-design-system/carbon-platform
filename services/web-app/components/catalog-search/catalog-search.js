/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid, Layer, Search, Tag, Theme } from '@carbon/react'
import { ChevronDown, ChevronUp, OverflowMenuHorizontal } from '@carbon/react/icons'
import { useState } from 'react'

import { useMediaQueryContext } from '@/contexts/media-query'

import styles from './catalog-search.module.scss'

const CatalogSearch = ({ onSearch, onSelect }) => {
  const [query, setQuery] = useState('')
  const [select, setSelect] = useState([])
  const [triggerMultiselect, setTriggerMultiselect] = useState(false)
  const [triggerOverflow, setTriggerOverflow] = useState(false)
  const { isMd } = useMediaQueryContext()

  const handleOnChange = (event) => {
    setQuery(event.target.value)
    onSearch(event.target.value)
  }

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
        <div className={styles.filterTagContainer} key={key}>
          <fieldset key={key}>
            <legend className={styles.fitlerTitle}>{title}</legend>
            <div>
              {options.map((selectedFilter, i) => (
                <Tag className={styles.filterTag} key={i} onClick={handleSelect}>
                  {selectedFilter}
                </Tag>
              ))}
            </div>
          </fieldset>
        </div>
    ))
    : null

  const tag = select.length
    ? (
    <>
      {select.slice(0, 6).map((item, i) => (
        <Tag
          key={i}
          className={styles.tag}
          filter
          onClick={() => {
            handleRemoveItem(item)
          }}
        >
          {item}
        </Tag>
      ))}
      {select.length > 6 && (
        <>
          <div className={styles.tagOverflowLabel}>
            <span title={select.length - 6 + ' more'}>{select.length - 6 + ' more'}</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setTriggerOverflow(!triggerOverflow)
            }}
          >
            <OverflowMenuHorizontal size={16} />
          </button>
        </>
      )}
    </>
      )
    : null

  return (
    <Theme className={styles.container} theme="white">
      <Layer>
        <Grid condensed={!isMd} narrow={isMd}>
          <Column className={styles.column} sm={3} md={4} lg={8}>
            <Search
              id="catalog-search"
              labelText="Search component index by name, keyword, or domain"
              placeholder="Component name, keyword, domain"
              value={query}
              onChange={handleOnChange}
              size="lg"
            />
          </Column>
          <Column sm={1} md={4} lg={4}>
            <button
              type="button"
              onClick={() => {
                setTriggerMultiselect(!triggerMultiselect)
              }}
              className={styles.multiselectInput}
            >
              <div className={styles.inputContainer}>
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
        </Grid>
        <Grid condensed={!isMd} narrow={isMd}>
          <Column className={styles.column} sm={4} md={8} lg={12}>
            {triggerMultiselect
              ? (
              <div className={styles.dropdownContainer}>{filterTag}</div>
                )
              : (
              <div className={styles.tagInput}>{tag}</div>
                )}
            {triggerOverflow ? <div className={styles.placeholderOverflow}>{'hi'}</div> : null}
          </Column>
        </Grid>
      </Layer>
    </Theme>
  )
}

export default CatalogSearch
