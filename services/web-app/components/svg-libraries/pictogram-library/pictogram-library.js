/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'
import debounce from 'lodash/debounce'
import groupBy from 'lodash/groupBy'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

import useColumnCount from '@/utils/use-column-count'

import FilterRow from '../filter-row'
import NoResult from '../no-result'
import styles from '../svg-library.module.scss'
import PictogramCategory from './pictogram-category'

const PictogramLibrary = ({ pictogramCategoryMetadata, pictogramMetadata }) => {
  const [pictogramComponents, setPictogramComponents] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All pictograms')
  const [searchInputValue, setSearchInputValue] = useState('')
  const [categoryList, setCategoryList] = useState([])
  const [categoriesLoaded, setCategoriesLoaded] = useState(false)

  const debouncedSetSearchInputValue = debounce(setSearchInputValue, 200)
  const columnCount = useColumnCount({ assetType: 'pictograms' })

  useEffect(() => {
    const pictogramArray = pictogramMetadata.reduce((accumulator, pictogram) => {
      if (pictogram.deprecated) {
        return accumulator
      }

      const path = [...pictogram.namespace, pictogram.name].join('/')

      return [
        ...accumulator,
        {
          ...pictogram,
          Component: dynamic(() => import(`@carbon/pictograms-react/lib/${path}`))
        }
      ]
    }, [])

    setCategoryList(pictogramCategoryMetadata.map(({ name }) => name).sort())
    setCategoriesLoaded(true)

    setPictogramComponents(pictogramArray)
  }, [pictogramCategoryMetadata, pictogramMetadata])

  const getFilteredPictograms = () => {
    if (!searchInputValue) {
      return pictogramComponents
    }
    return pictogramComponents.filter(({ friendlyName, category, aliases = [], name }) => {
      const searchValue = searchInputValue.toLowerCase()
      return (
        friendlyName.toLowerCase().includes(searchValue) ||
        aliases
          .filter(Boolean)
          .some((alias) => alias.toString().toLowerCase().includes(searchValue)) ||
        category.toLowerCase().includes(searchValue) ||
        name.toLowerCase().includes(searchValue)
      )
    })
  }

  const filteredPictograms = getFilteredPictograms()

  const allCategories = Object.entries(groupBy(filteredPictograms, 'category')).sort(
    ([categoryA], [categoryB]) => categoryA > categoryB
  )

  const filteredCategories =
    selectedCategory === 'All pictograms'
      ? allCategories
      : allCategories.filter(([category]) => category === selectedCategory)

  const shouldShowNoResult = !!(categoriesLoaded && filteredCategories.length < 1)

  return (
    <Grid condensed>
      <Column sm={4} md={8} lg={12}>
        <div className={styles['svg-page']}>
          <FilterRow
            type="pictogram"
            categoryList={categoryList}
            selectedCategory={selectedCategory}
            onSearchChange={(e) => debouncedSetSearchInputValue(e.currentTarget.value)}
            onDropdownChange={({ selectedItem }) => setSelectedCategory(selectedItem)}
          />
          {shouldShowNoResult && (
            <NoResult
              type="pictograms"
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              allIconResults={filteredPictograms.length}
              pageName="pictogram"
              pageUrl="https://github.com/carbon-design-system/carbon/raw/v10/packages/pictograms/master/productive-pictogram-master.ai"
            />
          )}
          {!shouldShowNoResult && (
            <div className={styles['svg-library']}>
              {filteredCategories.map(([category, pictograms]) => (
                <PictogramCategory
                  columnCount={columnCount}
                  key={category}
                  category={category}
                  pictograms={pictograms}
                />
              ))}
            </div>
          )}
        </div>
      </Column>
    </Grid>
  )
}
export default PictogramLibrary
