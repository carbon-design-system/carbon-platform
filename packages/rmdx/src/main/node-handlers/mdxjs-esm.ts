/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { MdxjsEsm } from 'mdast-util-mdxjs-esm'

import { ErrorNode } from '../error-node.js'
import { NoParentNodeException } from '../exceptions/no-parent-element-exception.js'
import { RestrictedSyntaxException } from '../exceptions/restricted-syntax-exception.js'
import { NodeHandler } from '../interfaces.js'
import { replaceNode } from '../replace-node.js'

/**
 * Handles an mdxjsEsm node by removing it from the AST.
 *
 * Example: `import x from 'y'`
 *
 * @param data Incoming data for this node.
 * @returns a VisitorResult.
 */
const mdxjsEsm: NodeHandler = (data, { onError }) => {
  const nodeAsMdxjsEsm = data.node as Partial<MdxjsEsm>
  if (!data.parent) {
    throw new NoParentNodeException(nodeAsMdxjsEsm.value || '', data.node.position)
  }

  // mdxjsEsm expressions are not allowed, so store an error
  const errorIndex = onError(
    new RestrictedSyntaxException(nodeAsMdxjsEsm.value || '', data.node.position)
  )

  return replaceNode(data, new ErrorNode(errorIndex).serialize())
}

export { mdxjsEsm }
