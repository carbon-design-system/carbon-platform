/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {
  Column,
  DataTable,
  Dropdown,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tag
} from '@carbon/react'
import PropTypes from 'prop-types'
import { useCallback, useEffect, useState } from 'react'

import styles from './filter-data-table.module.scss'

const headerData = [
  {
    header: 'Maintainer',
    key: 'maintainer'
  },
  {
    header: 'Design kit',
    key: 'name'
  },
  {
    header: 'Type',
    key: 'type'
  }
]

const tagColor = {
  elements: 'high-contrast',
  ui: 'cyan',
  guidelines: 'red',
  wireframes: 'warm gray'
}

const FilterDataTable = ({ designKitsData, designTools, designKitIds }) => {
  const [filteredRows, setFilteredRows] = useState(designKitsData)
  const [currentItem, setCurrentItem] = useState(designTools[0])

  const designKits = designKitsData.filter((item) => {
    return designKitIds?.includes(item.id)
  })

  const filterByDesignTool = useCallback(
    (designKits) => {
      if (!currentItem) {
        return designKits
      }
      return designKits.filter(
        (item) =>
          // allows to check for Adobe XD
          item.tool[0].toUpperCase() +
            item.tool.split('-')[0].slice(1) +
            ' ' +
            item.tool.split('-')[1]?.toUpperCase() ===
            currentItem || item.tool[0].toUpperCase() + item.tool.slice(1) === currentItem
      )
    },
    [currentItem]
  )

  const handleFilterChange = ({ selectedItem }) => {
    setCurrentItem(selectedItem)
  }

  useEffect(() => {
    setFilteredRows(filterByDesignTool(designKits))
  }, [currentItem, designKits, filterByDesignTool])

  return (
    <>
      <Grid className={styles.grid} narrow>
        <Column sm={4} md={8} lg={4}>
          <Dropdown
            id="filter data table"
            size="lg"
            items={designTools}
            onChange={handleFilterChange}
            selectedItem={`Tool: ${currentItem}`}
          />
        </Column>
      </Grid>
      <DataTable rows={filteredRows} headers={headerData}>
        {({ rows, headers, getHeaderProps, getTableProps, i }) => (
          <Table {...getTableProps()}>
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableHeader key={i} {...getHeaderProps({ header })}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.value}>
                  <TableCell>
                    <div>
                      {row.cells[0].value
                        ? row.cells[0].value
                            ?.replace(/-/g, ' ')
                            .replace(/(?:^|\s)\S/g, (a) => a.toUpperCase())
                        : 'Community'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>{row.cells[1].value}</div>
                  </TableCell>
                  <TableCell>
                    <Tag type={tagColor[row.cells[2].value]}>
                      {row.cells[2].value === 'ui'
                        ? 'UI'
                        : row.cells[2].value[0].toUpperCase() + row.cells[2].value.slice(1)}
                    </Tag>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </DataTable>
    </>
  )
}

FilterDataTable.propTypes = {
  /**
   * Pass in the children that will be rendered within the FilterDataTable
   */
  designKitIds: PropTypes.array,
  /**
   * Pass in the children that will be rendered within the FilterDataTable
   */
  designKitsData: PropTypes.array,
  /**
   * Pass in the children that will be rendered within the FilterDataTable
   */
  designTools: PropTypes.array
}

export default FilterDataTable
