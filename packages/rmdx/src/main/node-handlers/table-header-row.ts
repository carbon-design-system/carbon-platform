/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Parent } from 'unist-util-visit'

import { NodeHandler } from '../interfaces.js'

const tableHeaderRow: NodeHandler = (data) => {
  const nodeAsParent = data.node as Partial<Parent>

  data.node.nodeType = 'table-header-row'

  nodeAsParent.children?.forEach((child) => {
    child.type = 'tableHeaderCell'
  })
}

export { tableHeaderRow }
