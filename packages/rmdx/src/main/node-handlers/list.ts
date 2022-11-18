/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { List } from 'mdast'

import { NodeHandler } from '../interfaces.js'

const list: NodeHandler = (data) => {
  const nodeAsList = data.node as Partial<List>
  data.node.nodeType = nodeAsList.ordered ? 'ordered-list' : 'unordered-list'

  delete nodeAsList.spread
  delete nodeAsList.start
  delete nodeAsList.ordered
}

export { list }
