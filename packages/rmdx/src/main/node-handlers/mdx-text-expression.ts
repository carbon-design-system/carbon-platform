/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { NodeHandler } from '../interfaces.js'

/**
 * Handles an mdxTextExpression node by removing it from the AST.
 *
 * @param data Incoming data for this node.
 * @returns a VisitorResult.
 */
const mdxTextExpression: NodeHandler = (data) => {
  // TODO: store an error entry
  if (!data.parent) {
    // TODO: make this better
    throw new Error('MDX text expression had no parent element')
  }

  const index = data.index || 0

  data.parent.children.splice(index, 1)

  return index
}

export { mdxTextExpression }
