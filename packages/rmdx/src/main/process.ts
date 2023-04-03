/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { createProcessor } from '@mdx-js/mdx'
import remarkGfm from 'remark-gfm'
import { visit, Visitor } from 'unist-util-visit'
import { VFile } from 'vfile'
import { matter } from 'vfile-matter'
import { VFileMessage } from 'vfile-message'

import { InputTooLargeException } from './exceptions/input-too-large-exception.js'
import { MalformedMdxException } from './exceptions/malformed-mdx-exception.js'
import { NoSuchHandlerException } from './exceptions/no-such-handler-exception.js'
import { ProcessingException } from './exceptions/processing-exception.js'
import {
  AllowedComponents,
  AstNode,
  NodeHandler,
  ProcessedMdx,
  RenderableAstNode
} from './interfaces.js'
import * as nodeHandlers from './node-handlers/index.js'

const MAX_INPUT_LENGTH = 1000000 // bytes

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
const visitor: NodeHandler = (data, callbacks) => {
  const handler = nodeHandlers[data.node.type as keyof NodeHandlers]
  if (!handler) {
    throw new NoSuchHandlerException(data.node.type || '', data.node.position)
  }

  const result = handler(data, callbacks)
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
function createVisitor(
  allowedComponents: AllowedComponents,
  errors: Array<ProcessingException>
): Visitor {
  return (node, index, parent) => {
    const nodeAsAstNode = node as AstNode
    nodeAsAstNode.props = {
      parentNodeType: '' // Default to '' since this is overridden by each node handler
    }

    return visitor(
      {
        allowedComponents,
        node: nodeAsAstNode,
        index: index || undefined,
        parent: parent || undefined
      },
      {
        onError(err: ProcessingException) {
          return errors.push(err) - 1
        }
      }
    )
  }
}

/**
 * Processes a source MDX string and turns it into an RMDX AST. The contents of this AST is
 * considered "safe" for use by React components when rendered via `<AstNode />`.
 *
 * There are two types of errors that processing can manifest:
 * - Unrecoverable errors manifest as thrown exceptions, most (but not all) of which inherit from
 *   `ProcessingException`.
 * - Recoverable errors are returned in the result object's `errors` key as exception objects that
 *   inherit from `ProcessingException`s.
 *
 * @param srcMdx Input MDX string.
 * @param allowedComponents List of allowable JSX components that can be used in the input MDX.
 * @returns An RMDX result object containing an AST for use by `<AstNode />`.
 */
function process(srcMdx: string, allowedComponents: AllowedComponents): ProcessedMdx {
  // Guard - max input length
  if (srcMdx.length > MAX_INPUT_LENGTH) {
    throw new InputTooLargeException(`srcMdx exceeded max length of ${MAX_INPUT_LENGTH} bytes`)
  }

  const errors: Array<ProcessingException> = []

  // Extract the frontmatter from the source MDX
  const f = new VFile(srcMdx)
  matter(f, { strip: true })
  const frontmatter = f.data?.matter || {}

  // Process the remaining mdx
  let result
  try {
    result = processor.parse(f.value)
  } catch (err) {
    if (err instanceof VFileMessage) {
      throw new MalformedMdxException(err.reason, err.position || undefined)
    }

    throw err
  }

  visit(result, createVisitor(allowedComponents, errors))

  return {
    frontmatter: frontmatter as Record<string, unknown>,
    // Consider the unist node as a renderable ast node since we modified it as such in the tree
    ast: result as unknown as RenderableAstNode,
    errors: errors.map((err) => err.serialize())
  }
}

export { process }
