/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-debugger */
import metaData from '@carbon/icons/metadata.json'
import { Column, Grid } from '@carbon/react'
import loadable from '@loadable/component'
import { debounce, groupBy } from 'lodash-es'
import React, { useEffect, useState } from 'react'

import FilterRow from '@/components/svg-libraries/filter-row'
import useColumnCount from '@/utils/use-column-count'

import NoResult from '../no-result'
import styles from '../svg-library.module.scss'
import IconCategory from './icon-category'

const { icons: iconMetaData, categories: iconCategoryMetadata } = metaData

const IconLibrary = () => {
  const [iconComponents, setIconComponents] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All icons')
  const [searchInputValue, setSearchInputValue] = useState('')
  const [categoryList, setCategoryList] = useState([])
  const [categoriesLoaded, setCategoriesLoaded] = useState(false)
  const columnCount = useColumnCount({ assetType: 'icons' })

  const debouncedSetSearchInputValue = debounce(setSearchInputValue, 200)

  useEffect(() => {
    const iconArray = iconMetaData.reduce((accumulator, icon) => {
      if (icon.deprecated) {
        return accumulator
      }

      let path
      if (icon.sizes.length === 1 && icon.sizes[0] === 'glyph') {
        path = icon.output.find((output) => output.size === 'glyph').filepath
      } else {
        path = icon.output.find((output) => output.size === 32).filepath
      }

      if (icon.sizes.length === 1 && icon.sizes[0] === 'glyph') {
        return [
          ...accumulator,
          {
            ...icon,
            Component: loadable(() => import(`@carbon/icons-react/lib/${path}`))
          }
        ]
      }
      return [
        ...accumulator,
        {
          ...icon,
          Component: loadable(() => import(`@carbon/icons-react/lib/${path}`))
        }
      ]
    }, [])

    setCategoryList(
      iconCategoryMetadata
        .flatMap(({ subcategories }) => subcategories.flatMap(({ name }) => name))
        .sort()
    )

    setCategoriesLoaded(true)

    setIconComponents(iconArray)
  }, [])

  const getFilteredIcons = () => {
    if (!searchInputValue) {
      return iconComponents
    }
    return iconComponents.filter(
      // eslint-disable-next-line camelcase
      ({ friendlyName, category, subcategory, aliases = [], name }) => {
        const searchValue = searchInputValue.toLowerCase()
        return (
          friendlyName.toLowerCase().includes(searchValue) ||
          aliases.some((alias) => alias.toString().toLowerCase().includes(searchValue)) ||
          subcategory.toLowerCase().includes(searchValue) ||
          category.toLowerCase().includes(searchValue) ||
          name.toLowerCase().includes(searchValue)
        )
      }
    )
  }

  const filteredIcons = getFilteredIcons()

  const allCategories = Object.entries(groupBy(filteredIcons, 'subcategory')).sort()

  const filteredCategories =
    selectedCategory === 'All icons'
      ? allCategories
      : allCategories.filter(([category]) => category === selectedCategory)

  const shouldShowNoResult = categoriesLoaded && filteredCategories.length < 1

  return (
    <Grid condensed>
      <Column sm={4} md={8} lg={12}>
        <div className={styles.svgPage}>
          <FilterRow
            categoryList={categoryList}
            selectedCategory={selectedCategory}
            onSearchChange={(e) => debouncedSetSearchInputValue(e.currentTarget.value)}
            onDropdownChange={({ selectedItem }) => setSelectedCategory(selectedItem)}
          />
          {shouldShowNoResult
            ? (
            <NoResult
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              allIconResults={filteredIcons.length}
              pageName="icon"
              pageUrl="https://github.com/carbon-design-system/carbon/blob/v10/packages/icons/master/ui-icon-master.ai"
            />
              )
            : (
            <div className={styles.svgLibrary}>
              {filteredCategories.map(([category, icons]) => (
                <IconCategory
                  columnCount={columnCount}
                  key={category}
                  category={category}
                  icons={icons}
                />
              ))}
            </div>
              )}
        </div>
      </Column>
    </Grid>
  )
}
export default IconLibrary
