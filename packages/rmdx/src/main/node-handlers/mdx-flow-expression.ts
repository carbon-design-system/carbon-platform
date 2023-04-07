/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { MdxFlowExpression } from 'mdast-util-mdx-expression'

import { ErrorNode } from '../error-node.js'
import { NoParentNodeException } from '../exceptions/no-parent-element-exception.js'
import { RestrictedSyntaxException } from '../exceptions/restricted-syntax-exception.js'
import { NodeHandler } from '../interfaces.js'
import { replaceNode } from '../replace-node.js'

/**
 * Handles an mdxFlowExpression node by removing it from the AST.
 *
 * Example: `{x+y}`
 *
 * @param data Incoming data for this node.
 * @returns a VisitorResult.
 */
const mdxFlowExpression: NodeHandler = (data, { onError }) => {
  const nodeAsMdxFlowExpression = data.node as Partial<MdxFlowExpression>

  if (!data.parent) {
    throw new NoParentNodeException(`{${nodeAsMdxFlowExpression.value}}`, data.node.position)
  }

  // mdxFlowExpressions are not allowed, so store an error
  const errorIndex = onError(
    new RestrictedSyntaxException(`{${nodeAsMdxFlowExpression.value}}`, data.node.position)
  )

  return replaceNode(data, new ErrorNode(errorIndex).serialize())
}

export { mdxFlowExpression }
