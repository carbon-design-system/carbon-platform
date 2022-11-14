/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { createProcessor } from '@mdx-js/mdx'
import { visit, Visitor } from 'unist-util-visit'

import { NodeHandler, Renderable, RmdxRoot } from './interfaces.js'
import * as nodeHandlers from './node-handlers/index.js'

// TODO: if something ends up with no component, it needs to be removed from the AST
// TODO: enforce max length

type NodeHandlers = Record<keyof typeof nodeHandlers, NodeHandler>

const processor = createProcessor()

const visitor: Visitor = function visitor(node, index, parent) {
  const handler = nodeHandlers[node.type as keyof NodeHandlers]
  if (!handler) {
    // TODO: better error handling
    throw new Error('no handler found for node type ' + node.type)
  }

  const result = handler(node, index, parent)
  const partialNode = node as Partial<typeof node>

  delete partialNode.position
  delete partialNode.type

  return result
}

function process(srcMdx: string) {
  const result = processor.parse(srcMdx)

  visit(result, visitor)

  return result as Renderable<typeof result> & RmdxRoot
}

export { process }
