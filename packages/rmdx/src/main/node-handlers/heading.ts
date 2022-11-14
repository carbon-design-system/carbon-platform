/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Heading } from 'mdast'

import { NodeHandler } from '../interfaces.js'

const heading: NodeHandler = (data) => {
  const heading = data.node as Partial<Heading>
  data.node.nodeType = 'heading-' + heading.depth

  delete heading.depth
}

export { heading }
