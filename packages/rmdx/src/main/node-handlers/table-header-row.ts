/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Parent } from 'unist'

import { NodeHandler } from '../interfaces.js'

type RowData = { align: Array<string | null> } | undefined

const tableHeaderRow: NodeHandler = (data) => {
  const nodeAsParent = data.node as Partial<Parent>

  data.node.type = 'table-header-row'

  nodeAsParent.children?.forEach((cell, index) => {
    cell.type = 'tableHeaderCell'
    cell.data ||= {}
    cell.data.align = (data.node.data as RowData)?.align[index]
  })

  delete data.node.data
}

export { tableHeaderRow }
