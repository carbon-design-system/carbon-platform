/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { JSXElementConstructor } from 'react'
import { Node, Position } from 'unist'
import { VisitorResult } from 'unist-util-visit'

import { ProcessingException } from './exceptions/processing-exception.js'

/**
 * An array of strings representing component names which are allowed to exist in any output ASTs.
 */
type AllowedComponents = Array<string>

type Scalar = string | number | boolean

type AdditionalProps = {
  parentType: string
}

type AstNode = Node & {
  children?: Array<AstNode>
  props: { [prop: string]: Scalar } & AdditionalProps
  value?: Scalar
}

type RenderableAstNode = Omit<AstNode, 'data' | 'position' | 'type'>

/**
 * Utility type used by components/functions which consume `ProcessedMdx` and convert
 * `RenderableAstNode`s into React component trees. This type is generic so more specific component
 * props can be defined.
 *
 * Example:
 *
 * ```
 * import { Renderer} from '@carbon-platform/rmdx'
 *
 * const LinkRenderer: Renderer = ({ children, href }) => {
 *   return (
 *     <MyCustomLink href={href}>
 *       <a>{children}</a>
 *     </MyCustomLink>
 *   )
 * }
 * ```
 */
type Renderer<Props = unknown> = JSXElementConstructor<Props & AdditionalProps>

interface NodeHandler {
  (
    data: NodeHandlerData,
    callbacks: {
      /**
       * Logs an error in the VisitorResult and returns its index.
       *
       * @param err The error to log.
       * @returns The index of the error in the errors array.
       */
      onError(err: ProcessingException): number
    }
  ): VisitorResult
}

interface NodeHandlerData {
  node: AstNode
  index?: number
  parent?: ParentAstNode
  allowedComponents: AllowedComponents
}

interface ParentAstNode extends AstNode {
  children: NonNullable<AstNode['children']>
}

interface ProcessedMdx {
  frontmatter: Record<string, unknown>
  ast: RenderableAstNode
  errors: Array<SerializedMdxError>
}

interface RmdxNodeProps {
  // Allow the components prop to accept a map of Renderers specifying any arbitrary props on the
  // components
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- See above
  components: Record<string, Renderer<any>>
  astNode: AstNode
}

interface SerializedMdxError {
  type: string
  position: Position
  src: string
}

export {
  AllowedComponents,
  AstNode,
  NodeHandler,
  NodeHandlerData,
  ParentAstNode,
  ProcessedMdx,
  RenderableAstNode,
  Renderer,
  RmdxNodeProps,
  Scalar,
  SerializedMdxError
}
