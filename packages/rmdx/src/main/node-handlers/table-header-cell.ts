/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { NodeHandler } from '../interfaces.js'

type CellData = { align: string | null } | undefined

const tableHeaderCell: NodeHandler = (data) => {
  data.node.nodeType = 'table-header-cell'

  const cellData = data.node.data as CellData

  if (cellData?.align) {
    data.node.props.textAlign = cellData.align
  }

  delete data.node.data
}

export { tableHeaderCell }
