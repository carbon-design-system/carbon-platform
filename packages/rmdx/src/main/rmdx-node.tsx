/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { JSXElementConstructor } from 'react'

import { RmdxRoot } from './interfaces.js'

interface RmdxNodeProps {
  components: Record<string, JSXElementConstructor<{ children: unknown }>>
  astNode: RmdxRoot
}

const RmdxNode = ({ components, astNode }: RmdxNodeProps) => {
  if (!astNode.nodeType) {
    throw new Error('No nodeType specified')
  }

  // Node with a "value" are handled in the innerContent map below, so this is only used to filter
  // a complex type down to a simpler one
  if ('value' in astNode) {
    return null
  }

  const Component = components[astNode.nodeType]
  if (!Component) {
    throw new Error('No component mapping for nodeType ' + astNode.nodeType)
  }

  const innerContent = astNode.children.map((childAstNode, index) => {
    if ('value' in childAstNode) {
      return childAstNode.value
    }

    return <RmdxNode key={index} components={components} astNode={childAstNode} />
  })

  return (
    <Component {...astNode.props}>
      {innerContent.length === 1 ? innerContent[0] : innerContent}
    </Component>
  )
}

export { RmdxNode }
