/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { SKIP } from 'unist-util-visit'

import { NodeHandler } from '../interfaces.js'

/**
 * Removes the mdxFlowExpression from the AST.
 *
 * @param data Incoming data for this node.
 * @returns a VisitorResult.
 */
const mdxFlowExpression: NodeHandler = (data) => {
  // TODO: store an error entry

  if (!data.index || !data.parent) {
    return SKIP
  }

  data.parent.children.splice(data.index, 1)

  return data.index
}

export { mdxFlowExpression }
