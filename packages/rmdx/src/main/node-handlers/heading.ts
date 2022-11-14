/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Heading } from 'mdast'

import { NodeHandler } from '../interfaces.js'

const heading: NodeHandler = (node) => {
  const heading = node as Partial<Heading>
  node.nodeType = 'heading-' + heading.depth

  delete heading.depth
}

export { heading }
