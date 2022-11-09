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

  const Component = components[astNode.nodeType]
  if (!Component) {
    throw new Error('No component mapping for nodeType ' + astNode.nodeType)
  }

  if ('value' in astNode) {
    return <Component {...astNode.props}>{astNode.value}</Component>
  }

  const innerContent = astNode.children.map((childAstNode, index) => {
    return <RmdxNode key={index} components={components} astNode={childAstNode} />
  })

  return <Component {...astNode.props}>{innerContent}</Component>
}

export { RmdxNode }
