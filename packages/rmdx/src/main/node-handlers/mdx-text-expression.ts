/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { MdxTextExpression } from 'mdast-util-mdx-expression'

import { ErrorNode } from '../error-node.js'
import { NoParentNodeException } from '../exceptions/no-parent-element-exception.js'
import { RestrictedSyntaxException } from '../exceptions/restricted-syntax-exception.js'
import { NodeHandler } from '../interfaces.js'
import { replaceNode } from '../replace-node.js'

/**
 * Handles an mdxTextExpression node by removing it from the AST.
 *
 * Example: `Hello {'some text'}`
 *
 * @param data Incoming data for this node.
 * @returns a VisitorResult.
 */
const mdxTextExpression: NodeHandler = (data, { onError }) => {
  const nodeAsMdxTextExpression = data.node as Partial<MdxTextExpression>
  if (!data.parent) {
    throw new NoParentNodeException(`{${nodeAsMdxTextExpression.value}}`, data.node.position)
  }

  // mdxTextExpressions are not allowed, so store an error
  const errorIndex = onError(
    new RestrictedSyntaxException(`{${nodeAsMdxTextExpression.value}}`, data.node.position)
  )

  return replaceNode(data, new ErrorNode(errorIndex).serialize())
}

export { mdxTextExpression }
