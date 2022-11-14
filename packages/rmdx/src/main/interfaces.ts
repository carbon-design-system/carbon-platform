/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Node, Parent, VisitorResult } from 'unist-util-visit'

type Scalar = string | number | boolean

type Renderable<T> = T & RmdxNodeLike

type RmdxRoot = RmdxScalar | RmdxElement

type AllowedComponents = Array<string>

interface RmdxNodeLike {
  nodeType?: string
  props?: Record<string, Scalar>
}

interface RmdxScalar extends RmdxNodeLike {
  value: Scalar
}

interface RmdxElement extends RmdxNodeLike {
  children: Array<RmdxRoot>
}

interface NodeHandler {
  (data: {
    node: Renderable<Partial<Node>>
    index?: number
    parent?: Parent
    allowedComponents: AllowedComponents
  }): VisitorResult
}

export {
  AllowedComponents,
  NodeHandler,
  Renderable,
  RmdxElement,
  RmdxNodeLike,
  RmdxRoot,
  RmdxScalar,
  Scalar
}
