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

const tagColor =
  {
    elements: 'blue',
    components: 'green',
    guidelines: 'purple',
    ui: 'gray',
    wireframes: 'magenta'
  }

const designTools = ['Figma', 'Sketch', 'Adobe-xd', 'Axure', 'Invision-freehand', 'Adobe-ase']

const FilterDataTable = ({ designKitsData }) => {
  const [filteredRows, setFilteredRows] = useState(designKitsData)
  const [currentItem, setCurrentItem] = useState('Figma')

  const filterByDesignTool = useCallback(
    (filteredData) => {
      if (!currentItem) {
        return filteredData
      }

      return filteredData.filter(
        (item) => item.tool[0].toUpperCase() + item.tool.slice(1) === currentItem
      )
    },
    [currentItem]
  )

  const handleFilterChange = ({ selectedItem }) => {
    setCurrentItem(selectedItem)
  }

  useEffect(() => {
    setFilteredRows(filterByDesignTool(designKitsData))
  }, [currentItem, designKitsData, filterByDesignTool])

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
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.value}>
                  <TableCell>
                    <div>{row.cells[0].value?.replace(/-/g, ' ').replace(/(?:^|\s)\S/g, a => a.toUpperCase())}</div>
                  </TableCell>
                  <TableCell>
                    <div>{row.cells[1].value}</div>
                  </TableCell>
                  <TableCell>
                    <Tag type={tagColor[row.cells[2].value]}>
                      {row.cells[2].value[0].toUpperCase() + row.cells[2].value.slice(1)}</Tag>
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

export default FilterDataTable
