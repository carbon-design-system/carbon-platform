/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Dropdown } from '@carbon/react'
import PropTypes from 'prop-types'
import { useCallback } from 'react'

import styles from './sort-by-dropdown.module.scss'

const convertItemToString = (item) => {
  return item ? item.text : ''
}

const SortByDropdown = ({ defaultSortIndex = 0, onSort, sortId, sortOptions = [] }) => {
  const handleDropdownChange = useCallback(
    ({ selectedItem }) => {
      onSort(selectedItem.id)
    },
    [onSort]
  )

  return (
    <Dropdown
      id="sort-by-dropdown"
      className={styles.dropdown}
      initialSelectedItem={sortOptions.find((item) => item.id === sortId)}
      items={sortOptions}
      itemToString={convertItemToString}
      onChange={handleDropdownChange}
      type="inline"
      titleText="Sort by:"
      label={sortOptions[defaultSortIndex].text}
      size="lg"
    />
  )
}

SortByDropdown.defaultProps = {
  defaultSortIndex: 0,
  sortOptions: []
}

SortByDropdown.propTypes = {
  /**
   * Indicates array position of default sort strategy in sortOptions array
   */
  defaultSortIndex: PropTypes.number,
  /**
   * (sortId) => void
   * Function to call when new sort option is selected.
   * Should update sortId passed to props
   */
  onSort: PropTypes.func.isRequired,
  /**
   * Id of currently selected sort option
   */
  sortId: PropTypes.string.isRequired,
  /**
   * Array of object options the list of items can be sorted by
   */
  sortOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string
    })
  ).isRequired
}

export default SortByDropdown
