/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {
  Column,
  DataTable,
  Dropdown,
  Grid,
  Link as CarbonLink,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tag
} from '@carbon/react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { useCallback, useEffect, useState } from 'react'

import { P } from '@/components/markdown'

import styles from './filterable-design-kit-table.module.scss'

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

const toolKeyValueMapper = {
  figma: 'Figma',
  sketch: 'Sketch',
  axure: 'Axure',
  'adobe-xd': 'Adobe XD'
}

const FilterableDesignKitTable = ({ designKitsData, designTools, designKitIds }) => {
  const [filteredRows, setFilteredRows] = useState(designKitsData)
  const [currentItem, setCurrentItem] = useState(designTools[0])

  const designKits = designKitsData.filter((item) => {
    return designKitIds?.includes(item.id)
  })

  // alphabetically sort by maintainer
  const [orderedDesignKits] = useState(
    designKits.sort((a, b) => {
      if (a.maintainer?.toLowerCase() < b.maintainer?.toLowerCase()) {
        return -1
      }
      if (a.maintainer?.toLowerCase() > b.maintainer?.toLowerCase()) {
        return 1
      }
      return 0
    })
  )

  const filterByDesignTool = useCallback(() => {
    if (!currentItem) {
      return orderedDesignKits
    }
    return orderedDesignKits.filter((item) => toolKeyValueMapper[item.tool] === currentItem)
  }, [currentItem, orderedDesignKits])

  const handleFilterChange = ({ selectedItem }) => {
    setCurrentItem(selectedItem)
  }

  useEffect(() => {
    setFilteredRows(filterByDesignTool())
  }, [currentItem, filterByDesignTool])

  // only render the first maintainer within the respective group
  const hideRepeatedMaintainer = (array) => {
    let previousValue = ''
    array.forEach((row, index) => {
      const currentValue = row.cells[0].value
      if (index > 0 && previousValue === currentValue) {
        row.cells[0].value = ''
      }
      previousValue = currentValue
    })
    return array
  }

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
              {hideRepeatedMaintainer(rows).map((row) => (
                <TableRow key={row.value}>
                  <TableCell>
                    {row.cells[0].value
                      ?.replace(/-/g, ' ')
                      .replace(/(?:^|\s)\S/g, (a) => a.toUpperCase())}
                  </TableCell>
                  <TableCell>{row.cells[1].value}</TableCell>
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
      {currentItem === 'Figma' && (
        <P>
          The links in the table for Figma Libraries are preview only. To learn more about
          installing Figma Libraries visit the{' '}
          <Link href="/designing/figma" passHref>
            <CarbonLink size="lg">Figma tutorial</CarbonLink>
          </Link>
          .
        </P>
      )}
    </>
  )
}

FilterableDesignKitTable.propTypes = {
  /**
   * Pass in the children that will be rendered within the FilterableDesignKitTable
   */
  designKitIds: PropTypes.array,
  /**
   * Pass in the children that will be rendered within the FilterableDesignKitTable
   */
  designKitsData: PropTypes.array,
  /**
   * Pass in the children that will be rendered within the FilterableDesignKitTable
   */
  designTools: PropTypes.array
}

export default FilterableDesignKitTable
