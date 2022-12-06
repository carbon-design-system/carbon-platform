/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { ReactElement } from 'react'

import { RmdxNodeProps } from './interfaces.js'

function RmdxNode({ components, astNode }: RmdxNodeProps) {
  const Component = components[astNode.nodeType]

  // Guard - specified component not found in mapping
  if (!Component) {
    throw new Error('No component mapping for nodeType ' + astNode.nodeType)
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
