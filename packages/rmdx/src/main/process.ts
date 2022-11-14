/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { createProcessor } from '@mdx-js/mdx'
import { visit, Visitor } from 'unist-util-visit'

import { AllowedComponents, NodeHandler, Renderable, RmdxRoot } from './interfaces.js'
import * as nodeHandlers from './node-handlers/index.js'

// TODO: if something ends up with no component, it needs to be removed from the AST
// TODO: enforce max length

type NodeHandlers = Record<keyof typeof nodeHandlers, NodeHandler>

const processor = createProcessor()

/**
 * The actual top-level visitor/node handler.
 *
 * @param data kwArgs input data
 * @returns The result of calling a specific node handler with the input data.
 */
const visitor: NodeHandler = (data) => {
  const handler = nodeHandlers[data.node.type as keyof NodeHandlers]
  if (!handler) {
    // TODO: better error handling
    throw new Error('no handler found for node type ' + data.node.type)
  }

  const result = handler(data)
  const partialNode = data.node as Partial<typeof data.node>

  delete partialNode.position
  delete partialNode.type

  return result
}

/**
 * Create a curried visitor function that includes the allowedComponents. This
 * also allows the internal visitor to receive arguments as keyword args.
 *
 * @param allowedComponents List of allowed components
 * @returns a curried Visitor function.
 */
function createVisitor(allowedComponents: AllowedComponents): Visitor {
  return (node, index, parent) => {
    return visitor({
      allowedComponents,
      node,
      index: index || undefined,
      parent: parent || undefined
    })
  }
}

/**
 * Processes a source MDX string and turns it into an RMDX AST. The contents of this AST is
 * considered "safe" for use by React components when rendered via `<AstNode />`.
 * @param srcMdx Input MDX string.
 * @param allowedComponents List of allowable JSX components that can be used in the input MDX.
 * @returns An RMDX AST for use by `<AstNode />`.
 */
function process(srcMdx: string, allowedComponents: AllowedComponents) {
  const result = processor.parse(srcMdx)

  visit(result, createVisitor(allowedComponents))

  return result as Renderable<typeof result> & RmdxRoot
}

export { process }
