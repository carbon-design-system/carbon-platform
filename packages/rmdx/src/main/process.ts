/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { createProcessor } from '@mdx-js/mdx'
import remarkGfm from 'remark-gfm'
import { visit, Visitor } from 'unist-util-visit'
import { VFile } from 'vfile'
import { matter } from 'vfile-matter'

import {
  AllowedComponents,
  AstNode,
  NodeHandler,
  ProcessedMdx,
  RenderableAstNode
} from './interfaces.js'
import * as nodeHandlers from './node-handlers/index.js'

// TODO: if something ends up with no component, it needs to be removed from the AST
// TODO: enforce max length

type NodeHandlers = Record<keyof typeof nodeHandlers, NodeHandler>

const processor = createProcessor({
  remarkPlugins: [remarkGfm]
})

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
  // const partialNode = data.node as Partial<typeof data.node>

  // Ensure all nodes have a parent node type set
  data.node.props.parentNodeType = (data.parent as AstNode | undefined)?.nodeType || ''

  delete data.node.position
  delete data.node.type

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
    const nodeAsAstNode = node as AstNode
    nodeAsAstNode.props = {
      parentNodeType: '' // Default to '' since this is overridden by each node handler
    }

    return visitor({
      allowedComponents,
      node: nodeAsAstNode,
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
function process(srcMdx: string, allowedComponents: AllowedComponents): ProcessedMdx {
  // Extract the frontmatter from the source MDX
  const f = new VFile(srcMdx)
  matter(f, { strip: true })
  const frontmatter = f.data?.matter || {}

  // Process the remaining mdx
  const result = processor.parse(f.value)
  visit(result, createVisitor(allowedComponents))

  return {
    frontmatter: frontmatter as Record<string, unknown>,
    // Consider the unist node as a renderable ast node since we modified it as such in the tree
    ast: result as unknown as RenderableAstNode
  }
}

export { process }
