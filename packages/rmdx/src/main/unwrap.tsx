/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { ReactElement, ReactNode } from 'react'

import { RmdxNodeProps } from './interfaces.js'
import { RmdxNode } from './rmdx-node.js'

function unwrap(node: ReactElement<RmdxNodeProps>) {
  console.log(node)

  // Guard - make sure you're not passing in an array of children
  if (Array.isArray(node)) {
    throw new Error('Can only unwrap a single node and not an array of nodes')
  }

  // Guard - node has no children, so just return it
  if (!node.props.astNode.children) {
    return node
  }

  return node.props.astNode.children.map((child, index) => {
    return <RmdxNode components={node.props.components} astNode={child} key={index} />
  })
}

export { unwrap }
