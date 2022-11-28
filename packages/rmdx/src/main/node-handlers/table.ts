/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Table, TableRow } from 'mdast'

import { NodeHandler } from '../interfaces.js'

interface PartitionedTable {
  children?: [
    {
      type: 'tableHeader'
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
  const nodeAsPartitionedTable = data.node as PartitionedTable
  data.node.nodeType = 'table'

  data.node.props.columns = nodeAsTable.align?.length || 0

  const headerChild = nodeAsTable.children?.[0]
  const bodyChildren = nodeAsTable.children?.slice(1)

  if (!headerChild || !bodyChildren) {
    // TODO: make this better
    throw new Error('Table was missing either a header row or body rows')
  }

  nodeAsPartitionedTable.children = [
    {
      type: 'tableHeader',
      children: [headerChild]
    },
    {
      type: 'tableBody',
      children: bodyChildren
    }
  ]

  delete nodeAsTable.align
}

export { table }
