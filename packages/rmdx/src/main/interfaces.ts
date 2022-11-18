/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { JSXElementConstructor } from 'react'
import { Node, Parent, VisitorResult } from 'unist-util-visit'

type AllowedComponents = Array<string>

type Scalar = string | number | boolean

type Renderable<T> = T & AstNodeLike

type AstNode = AstScalar | AstElement

type NodeMapper = JSXElementConstructor<RmdxProps & { children?: unknown }>

type NodeMappers = Record<string, NodeMapper>

interface RmdxProps {
  parentNodeType: string
}

interface AstNodeLike {
  nodeType: string
  props: RmdxProps & Record<string, Scalar>
}

interface AstScalar extends AstNodeLike {
  value: Scalar
}

interface AstElement extends AstNodeLike {
  children: Array<AstNode>
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
  AstElement,
  AstNode,
  AstNodeLike,
  AstScalar,
  NodeHandler,
  NodeMapper,
  NodeMappers,
  Renderable,
  Scalar
}
