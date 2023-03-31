/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { MalformedMdxException } from '../exceptions/malformed-mdx-exception.js'
import { RestrictedSyntaxException } from '../exceptions/restricted-syntax-exception.js'
import { NodeHandler } from '../interfaces.js'

/**
 * Handles an mdxFlowExpression node by removing it from the AST.
 *
 * Example: `{x+y}`
 *
 * @param data Incoming data for this node.
 * @returns a VisitorResult.
 */
const mdxFlowExpression: NodeHandler = (data, { onError }) => {
  // mdxFlowExpressions are not allowed, so store an error
  onError(new RestrictedSyntaxException('Filtered out an mdxFlowExpression', data.node))

  if (!data.parent) {
    throw new MalformedMdxException('MDX flow expression had no parent element', data.node)
  }

  const index = data.index || 0

  data.parent.children.splice(index, 1)

  return index
}

export { mdxFlowExpression }
