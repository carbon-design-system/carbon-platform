/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { ReactElement } from 'react'

import { RmdxNodeProps } from './interfaces.js'

function peek(child: ReactElement<RmdxNodeProps>) {
  const Component = child.props.components[child.props.astNode.nodeType]

  // Guard - specified component not found in mapping
  if (!Component) {
    throw new Error('No component mapping for nodeType ' + child.props.astNode.nodeType)
  }

  return {
    nodeType: child.props.astNode.nodeType,
    component: Component,
    props: child.props.astNode.props
  }
}

export { peek }
