/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { NodeHandler } from '../interfaces.js'

/**
 * This node handler is a passthrough of the provided text value.
 *
 * @param data The incoming data for this AST node.
 * @returns A VisitorResult.
 */
const text: NodeHandler = (data) => {
  data.node.nodeType = 'text'
}

export { text }
