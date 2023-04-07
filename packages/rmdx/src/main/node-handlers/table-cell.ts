/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { NodeHandler } from '../interfaces.js'

type CellData = { align: string | null } | undefined

const tableCell: NodeHandler = (data) => {
  const cellData = data.node.data as CellData

  data.node.type = 'table-cell'

  if (cellData?.align) {
    data.node.props.textAlign = cellData.align
  }

  delete data.node.data
}

export { tableCell }
