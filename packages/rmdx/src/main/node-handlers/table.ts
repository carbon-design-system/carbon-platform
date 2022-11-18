/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Table } from 'mdast'

import { NodeHandler } from '../interfaces.js'

const table: NodeHandler = (data) => {
  const nodeAsTable = data.node as Partial<Table>
  data.node.nodeType = 'table'

  data.node.props.columns = nodeAsTable.align?.length || 0

  delete nodeAsTable.align
}

export { table }
