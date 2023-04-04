/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { ReactElement } from 'react'

import { UnknownComponentException } from './exceptions/unknown-component-exception.js'
import { RmdxNodeProps } from './interfaces.js'

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
