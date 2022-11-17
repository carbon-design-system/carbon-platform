/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ListItem } from 'mdast'

import { NodeHandler } from '../interfaces.js'

const listItem: NodeHandler = (data) => {
  const nodeAsList = data.node as Partial<ListItem>
  data.node.nodeType = 'list-item'
  data.node.props = {
    spread: nodeAsList.spread ?? false,
    checked: nodeAsList.checked ?? false
  }

  delete nodeAsList.spread
  delete nodeAsList.checked
}

export { listItem }
