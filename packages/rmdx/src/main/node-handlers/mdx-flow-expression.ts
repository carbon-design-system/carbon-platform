/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { SKIP } from 'unist-util-visit'

import { NodeHandler } from '../interfaces.js'

const mdxFlowExpression: NodeHandler = (_node, index, parent) => {
  // TODO: store an error entry

  if (!index || !parent) {
    return SKIP
  }

  parent.children.splice(index, 1)

  return index
}

export { mdxFlowExpression }
