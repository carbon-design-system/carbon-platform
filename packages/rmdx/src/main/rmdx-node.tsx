/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'

import { RmdxNodeProps } from './interfaces.js'

/**
 * A react component which renders an RMDX AST as a tree of React components.
 *
 * @param props
 * @param props.components Map of react components used to render various node types found in the
 * provided AST.
 * @param props.astNode The RMDX AST, created via `process(...)`.
 * @returns A renderable React component
 */
function RmdxNode({ components, astNode }: RmdxNodeProps) {
  const Component = components[astNode.type]

  // Guard - specified component not found in mapping
  if (!Component) {
    throw new Error('No component mapping for nodeType ' + astNode.type)
  }

  if (astNode.value) {
    return <Component {...astNode.props}>{astNode.value}</Component>
  }

  if (astNode.children) {
    const innerContent = astNode.children.map((childAstNode, index) => {
      return <RmdxNode key={index} components={components} astNode={childAstNode} />
    })

    return (
      <Component {...astNode.props}>
        {innerContent.length === 1 ? innerContent[0] : innerContent}
      </Component>
    )
  }

  return <Component {...astNode.props} />
}

export { RmdxNode }
