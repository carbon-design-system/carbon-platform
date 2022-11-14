/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { NodeHandler } from '../interfaces.js'

const paragraph: NodeHandler = (node) => {
  node.nodeType = 'paragraph'
}

export { paragraph }
