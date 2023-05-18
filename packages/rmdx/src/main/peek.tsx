/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { ReactElement } from 'react'

import { UnknownComponentException } from './exceptions/unknown-component-exception.js'
import { RmdxNodeProps } from './interfaces.js'

/**
 * Given an `RmdxNode`, returns the to-be-rendered component, its props, and the associated RMDX
 * node type. This is useful in a `Renderer` to investigate details about an incoming child which
 * has been wrapped in an `RmdxNode`.
 *
 * @param child The node to unwrap.
 * @returns An object representing the "unwrapped" node.
 */
function peek(child: ReactElement<RmdxNodeProps>) {
  const Component = child.props.components[child.props.astNode.type]

  // Guard - specified component not found in mapping
  if (!Component) {
    throw new UnknownComponentException(child.props.astNode.type)
  }

  return {
    nodeType: child.props.astNode.type,
    component: Component,
    props: child.props.astNode.props
  }
}

export { peek }
