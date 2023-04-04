/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Table, TableRow } from 'mdast'

import { MalformedMdxException } from '../exceptions/malformed-mdx-exception.js'
import { NodeHandler } from '../interfaces.js'

interface HtmlTable {
  children?: [
    {
      type: 'tableHead'
      children: [TableRow]
    },
    {
      type: 'tableBody'
      children: Array<TableRow>
    }
  ]
}

const table: NodeHandler = (data) => {
  const nodeAsTable = data.node as Partial<Table>
  const nodeAsHtmlTable = data.node as HtmlTable

  data.node.type = 'table'
  data.node.props.columns = nodeAsTable.align?.length || 0

  const headerRow = nodeAsTable.children?.[0]
  const bodyRows = nodeAsTable.children?.slice(1) || []

  if (!headerRow) {
    throw new MalformedMdxException('Table was missing a header row', data.node.position)
  }

  // Propagate align values to header row
  headerRow.data ||= {}
  headerRow.data.align = nodeAsTable.align

  // Propagate align values to body rows
  bodyRows.forEach((row) => {
    row.data ||= {}
    row.data.align = nodeAsTable.align
  })

  nodeAsHtmlTable.children = [
    {
      type: 'tableHead',
      children: [headerRow]
    },
    {
      type: 'tableBody',
      children: bodyRows
    }
  ]

  delete nodeAsTable.align
}

export { table }
