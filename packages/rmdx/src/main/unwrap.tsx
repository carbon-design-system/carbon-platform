/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { ReactElement } from 'react'

import { RmdxNodeProps } from './interfaces.js'
import { RmdxNode } from './rmdx-node.js'

/**
 * Given a `children` object provided to a `Renderer` when rendering an RMDX AST, return `RmdxNode`s
 * for each of the actual child nodes from the RMDX AST. This is useful to interrogate the children
 * being passed along to RMDX `Renderer`s since by default they are wrapped in a singular `RmdxNode`
 * as opposed to an array of React nodes.
 *
 * @param node The node to unwrap and return as an array of RmdxNodes.
 * @returns A array of RmdxNodes; or the provided node if it had no children.
 */
function unwrap(node: ReactElement<RmdxNodeProps>) {
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
