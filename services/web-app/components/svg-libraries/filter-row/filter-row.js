/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Dropdown, Search } from '@carbon/react'
import clsx from 'clsx'
import PropTypes from 'prop-types'

import useSticky from '@/utils/use-sticky'

import styles from '../svg-library.module.scss'

const FilterRow = ({
  onSearchChange,
  onDropdownChange,
  selectedCategory,
  categoryList,
  type = 'icon'
}) => {
  const [filterRowRef, isSticky] = useSticky()
  const placeHolderText =
    type === 'icon'
      ? 'Search by descriptors like “add”, or “check”'
      : 'Search by descriptors like “electronics”, or “weather”'
  return (
    <div
      data-stuck={isSticky || undefined}
      ref={filterRowRef}
      className={clsx(styles['filter-row'], {
        [styles.pictograms]: type !== 'icon'
      })}
    >
      <Search
        labelText={`filter ${type}s by searching for their name or category`}
        onChange={onSearchChange}
        placeholder={placeHolderText}
        size="lg"
      />
      <Dropdown
        className={styles.dropdown}
        id="category-filter"
        size="lg"
        direction="bottom"
        selectedItem={selectedCategory}
        onChange={onDropdownChange}
        label={`Filter ${type}s by category`}
        items={[`All ${type}s`, ...categoryList]}
      />
    </div>
  )
}

FilterRow.defaultProps = {
  type: 'icon'
}

FilterRow.propTypes = {
  categoryList: PropTypes.arrayOf(PropTypes.string),
  onDropdownChange: PropTypes.func,
  onSearchChange: PropTypes.func,
  selectedCategory: PropTypes.string,
  type: PropTypes.string
}

export default FilterRow
