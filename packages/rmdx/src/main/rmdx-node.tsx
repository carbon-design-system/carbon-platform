/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'

import { AstNode, NodeMappers } from './interfaces.js'

interface RmdxNodeProps {
  components: NodeMappers
  astNode: AstNode
}

const RmdxNode = ({ components, astNode }: RmdxNodeProps) => {
  if ('value' in astNode) {
    // To satisfy type constraints which disallow the direct return of a string, the return value
    // is wrapped in a Fragment
    // eslint-disable-next-line react/jsx-no-useless-fragment -- See above
    return <>{astNode.value}</>
  }

  const Component = components[astNode.nodeType]
  if (!Component) {
    throw new Error('No component mapping for nodeType ' + astNode.nodeType)
  }

  let innerContent

  if ('children' in astNode) {
    innerContent = astNode.children.map((childAstNode, index) => {
      return <RmdxNode key={index} components={components} astNode={childAstNode} />
    })
  }

  if (innerContent) {
    return (
      <Component {...astNode.props}>
        {innerContent.length === 1 ? innerContent[0] : innerContent}
      </Component>
    )
  }

  return <Component {...astNode.props} />
}

export { RmdxNode }
