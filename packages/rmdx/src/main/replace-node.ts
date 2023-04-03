/*
 * Copyright IBM Corp. 2023, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Node } from 'unist'
import { CONTINUE } from 'unist-util-visit'

import { NoParentNodeException } from './exceptions/no-parent-element-exception.js'
import { NodeHandlerData } from './interfaces.js'

function replaceNode(data: NodeHandlerData, replacement: Node) {
  // Guard - no parent node
  if (!data.parent) {
    throw new NoParentNodeException(
      'Attempted to replace a node with no parent',
      data.node.position
    )
  }

  const index = data.index || 0
  const numChildren = data.parent.children.length

  // Replace the node
  data.parent.children[index] = replacement

  // No other children left, so just continue
  if (index + 1 >= numChildren) {
    return CONTINUE
  }

  return index + 1
}

export { replaceNode }
