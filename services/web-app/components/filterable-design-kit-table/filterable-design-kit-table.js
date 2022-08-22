/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Download, Launch } from '@carbon/icons-react'
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
import { teams } from '@/data/teams'

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
  },
  {
    header: '',
    key: 'action'
  },
  {
    header: '',
    key: 'url'
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

const captions = {
  Figma: (
    <P>
      The links in the table for Figma Libraries are preview only. Some of the Figma kits are for
      internal IBMers. To learn more about installing Figma Libraries and available external
      libraries visit the Figma tutorial{' '}
      <Link href="/designing/figma" passHref>
        <CarbonLink size="lg">Figma tutorial</CarbonLink>
      </Link>
      .
    </P>
  ),

  Sketch: (
    <P>
      To learn more about installing Sketch Libraries visit the{' '}
      <Link href="/designing/sketch" passHref>
        <CarbonLink size="lg">Sketch tutorial</CarbonLink>
      </Link>
      .
    </P>
  ),

  Axure: (
    <P>
      To learn more about installing Axure Libraries visit the{' '}
      <Link href="/designing/axure" passHref>
        <CarbonLink size="lg">Axure tutorial</CarbonLink>
      </Link>
      .
    </P>
  ),

  'Adobe XD': (
    <P>
      To learn more about installing Adobe XD Libraries visit the{' '}
      <Link href="/designing/adobe-xd" passHref>
        <CarbonLink size="lg">Adobe XD tutorial</CarbonLink>
      </Link>
      .
    </P>
  )
}

const FilterableDesignKitTable = ({ designKitsData, designTools, designKitIds }) => {
  const displayDropdown = designTools?.length > 0
  const [filteredRows, setFilteredRows] = useState(designKitsData)
  const [currentItem, setCurrentItem] = useState(displayDropdown ? designTools[0] : undefined)

  const designKits = designKitsData.filter((item) => {
    return designKitIds?.includes(item.id)
  })

  // after first rendering IBM Brand kits, alphabetically sort by maintainer
  const [orderedDesignKits] = useState(
    designKits.sort((a, b) => {
      if (a.maintainer?.toLowerCase() === 'ibm-brand') {
        return -1
      }
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

  // only render the first maintainer name within the respective group
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

  const renderType = (row) => {
    if (row.cells[2].value === 'ui') {
      return 'UI'
    } else {
      return row.cells[2].value[0].toUpperCase() + row.cells[2].value.slice(1)
    }
  }

  const renderIcon = (row) => {
    if (row.cells[3].value === 'download') {
      return <Download size={16} />
    } else {
      return <Launch size={16} />
    }
  }

  return (
    <>
      <Grid className={styles.grid} narrow>
        <Column sm={4} md={8} lg={4}>
          {displayDropdown && (
            <Dropdown
              id="filter data table"
              size="lg"
              items={designTools}
              onChange={handleFilterChange}
              selectedItem={`Tool: ${currentItem}`}
            />
          )}
        </Column>
      </Grid>
      <Grid className={styles.grid} narrow>
        <Column sm={4} md={8} lg={16}>
          <DataTable rows={filteredRows} headers={headerData}>
            {({ rows, headers, getHeaderProps, getTableProps, i }) => (
              <Table {...getTableProps()}>
                <TableHead>
                  <TableRow>
                    {headers.map((header, index) => {
                      if (index === 4) {
                        return null
                      } else {
                        return (
                          <TableHeader key={i} {...getHeaderProps({ header })}>
                            {header.header}
                          </TableHeader>
                        )
                      }
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {hideRepeatedMaintainer(rows).map((row, i) => (
                    <TableRow key={i}>
                      <TableCell>{teams[row.cells[0].value]?.name}</TableCell>
                      <TableCell>{row.cells[1].value}</TableCell>
                      <TableCell>
                        <Tag type={tagColor[row.cells[2].value]}>{renderType(row)}</Tag>
                      </TableCell>
                      <TableCell>
                        <Link key={i} href={row.cells[4].value}>
                          <a className={styles['row-anchor']}>
                            <span className={styles['row-icon']}>{renderIcon(row)}</span>
                          </a>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </DataTable>
        </Column>
      </Grid>
      {displayDropdown && captions[currentItem]}
    </>
  )
}

FilterableDesignKitTable.propTypes = {
  /**
   * Pass in designKitIdss that will be rendered within the FilterableDesignKitTable
   */
  designKitIds: PropTypes.array,
  /**
   * Fetch designKitsData within getStaticProps
   */
  designKitsData: PropTypes.array,
  /**
   * Pass in the designTools to be rendered
   * Do not define if there is only one tool and Dropdown needs to remain hidden
   */
  designTools: PropTypes.array
}

export default FilterableDesignKitTable
