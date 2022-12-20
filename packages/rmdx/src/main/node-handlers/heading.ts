/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Heading } from 'mdast'

import { NodeHandler } from '../interfaces.js'

const heading: NodeHandler = (data) => {
  const nodeAsHeading = data.node as Partial<Heading>
  data.node.nodeType = 'heading-' + nodeAsHeading.depth

  // Return a full-text representation of the children of this heading as a prop
  const childValues = data.node.children?.map((child) => {
    return child.value || ''
  })

  if (childValues) {
    data.node.props.fullText = childValues.join('')
  }

  delete nodeAsHeading.depth
}

export { heading }
