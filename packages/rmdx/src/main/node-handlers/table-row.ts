/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { NodeHandler } from '../interfaces.js'

type RowData = { align: Array<string | null> } | undefined

const tableRow: NodeHandler = (data) => {
  data.node.type = 'table-row'

  data.node.children?.forEach((cell, index) => {
    cell.data ||= {}
    cell.data.align = (data.node.data as RowData)?.align[index]
  })

  delete data.node.data
}

export { tableRow }
