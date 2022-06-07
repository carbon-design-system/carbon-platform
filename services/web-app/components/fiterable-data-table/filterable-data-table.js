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

import { headerData, rowData } from '@/data/data-table-content'
import { designTools } from '@/data/design-tools'

import styles from './filterable-data-table.module.scss'

const FilterableDataTable = () => {
  const [filteredData, setFilteredData] = useState(rowData)
  const [currentItem, setCurrentItem] = useState('Figma')

  const filterByDesignTool = useCallback(
    (filteredData) => {
      if (!currentItem) {
        return filteredData
      }

      return filteredData.filter((item) => item.design_tool === currentItem)
    },
    [currentItem]
  )

  const handleFilterChange = ({ selectedItem }) => {
    setCurrentItem(selectedItem)
  }

  useEffect(() => {
    const filteredData = filterByDesignTool(rowData)
    setFilteredData(filteredData)
  }, [currentItem, filterByDesignTool])

  return (
    <>
      <Grid className={styles.grid} narrow>
        <Column className={styles.column} sm={4} md={8} lg={4}>
          <Dropdown
            className={styles.dropdown}
            id="filterable table"
            size="lg"
            type="inline"
            titleText="Type:"
            items={designTools}
            onChange={handleFilterChange}
            selectedItem={currentItem}
          />
        </Column>
      </Grid>
      <DataTable rows={filteredData} headers={headerData}>
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
                <TableRow key={row.id}>
                  {row.cells.map((cell) => (
                    <TableCell key={cell.id}>{cell.value}</TableCell>
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

export default FilterableDataTable
