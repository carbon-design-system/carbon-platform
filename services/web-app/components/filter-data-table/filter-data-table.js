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
  TableRow
} from '@carbon/react'
import { useCallback, useEffect, useState } from 'react'

// import { rowData } from '@/data/filter-data-table-content'
import { designTools } from '@/data/filter-data-table-tools'

import designKitData from '../../../../packages/resources/carbon.yml'
import styles from './filter-data-table.module.scss'
import { filter } from 'minimatch'

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
const rowData2 = Object.values(designKitData.designKits)


console.log(rowData2[0], 'he')

const FilterDataTable = () => {
  const [filteredRows, setFilteredRows] = useState(rowData2)
  const [currentItem, setCurrentItem] = useState('figma')

  console.log(filteredRows, 'hi')

  const filterByDesignTool = useCallback(
    (filteredData) => {
      if (!currentItem) {
        return filteredData
      }

      return filteredData.filter((item) => item.tool === currentItem)
    },
    [currentItem]
  )

  const handleFilterChange = ({ selectedItem }) => {
    setCurrentItem(selectedItem)
  }

  useEffect(() => {
    setFilteredRows(filterByDesignTool(rowData2))
  }, [currentItem, filterByDesignTool])

  return (
    <>
      <Grid className={styles.grid} narrow>
        <Column className={styles.column} sm={4} md={8} lg={4}>
          <Dropdown
            className={styles.dropdown}
            id="filter data table"
            size="lg"
            type="inline"
            titleText="Type:"
            items={designTools}
            onChange={handleFilterChange}
            selectedItem={currentItem}
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
            {console.log(rows, 'bye')}
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.value}>
                  {row.cells.map((cell) => (
                    <TableCell key={cell.value}>{cell.value}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </DataTable>
    </>
  )
}

export default FilterDataTable
