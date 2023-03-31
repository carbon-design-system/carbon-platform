/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { JSXElementConstructor } from 'react'
import { Node, Parent } from 'unist'
import { VisitorResult } from 'unist-util-visit'

import { ProcessingException } from './exceptions/processing-exception.js'

type AllowedComponents = Array<string>

type Scalar = string | number | boolean

type AdditionalProps = {
  parentNodeType: string
}

type AstNode = Partial<Node> & {
  children?: Array<AstNode>
  nodeType: string
  props: { [prop: string]: Scalar } & AdditionalProps
  value?: Scalar
}

type RenderableAstNode = Omit<AstNode, 'data' | 'position' | 'type'>

type Renderer<Props = unknown> = JSXElementConstructor<Props & AdditionalProps>

interface NodeHandler {
  (
    data: NodeHandlerData,
    callbacks: {
      onError(err: ProcessingException): void
    }
  ): VisitorResult
}

interface NodeHandlerData {
  node: AstNode
  index?: number
  parent?: Parent
  allowedComponents: AllowedComponents
}

interface ProcessedMdx {
  frontmatter: Record<string, unknown>
  ast: RenderableAstNode
  errors: Array<ProcessingException>
}

interface RmdxNodeProps {
  // Allow the components prop to accept a map of Renderers specifying any arbitrary props on the
  // components
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- See above
  components: Record<string, Renderer<any>>
  astNode: AstNode
}

export {
  AllowedComponents,
  AstNode,
  NodeHandler,
  NodeHandlerData,
  ProcessedMdx,
  RenderableAstNode,
  Renderer,
  RmdxNodeProps,
  Scalar
}
