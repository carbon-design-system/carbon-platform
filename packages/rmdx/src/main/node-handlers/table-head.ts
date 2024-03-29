/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Parent } from 'unist'

import { NodeHandler } from '../interfaces.js'

const tableHead: NodeHandler = (data) => {
  const nodeAsParent = data.node as Partial<Parent>

  data.node.type = 'table-head'

  nodeAsParent.children?.forEach((child) => {
    child.type = 'tableHeaderRow'
  })
}

export { tableHead }
