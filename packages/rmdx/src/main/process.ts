/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { createProcessor } from '@mdx-js/mdx'
import { Heading, Link } from 'mdast'
import { MdxJsxTextElement } from 'mdast-util-mdx-jsx'
import { Data, Node } from 'unist'
import { Parent, SKIP, visit, Visitor, VisitorResult } from 'unist-util-visit'

import { convertAttributesToProps } from './convert-attributes-to-props.js'
import { Renderable, RmdxRoot } from './interfaces.js'

// TODO: if something ends up with no component, it needs to be removed from the AST
// TODO: enforce max length

const processor = createProcessor()

const visitor: Visitor = function visitor(node, index, parent) {
  const handler = nodeHandlers[node.type]
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

// const jsxElementHandlers: {
//   [key: string]: (
//     node: Renderable<Partial<JsxLike>>,
//     index: number | null,
//     parent: Parent | null
//   ) => VisitorResult
// } = {
//   Button: (node) => {
//     node.nodeType = 'Button'
//   }
// }

const nodeHandlers: {
  [key: string]: (
    node: Renderable<Partial<Node<Data>>>,
    index: number | null,
    parent: Parent | null
  ) => VisitorResult
} = {
  link: (node) => {
    const link = node as Partial<Link>

    node.nodeType = 'link'
    node.props = {
      href: link?.url || ''
    }

    delete link.url
    delete link.title
  },
  emphasis: (node) => {
    node.nodeType = 'emphasis'
  },
  strong: (node) => {
    node.nodeType = 'strong'
  },
  heading: (node) => {
    const heading = node as Partial<Heading>
    node.nodeType = 'heading-' + heading.depth

    delete heading.depth
  },
  mdxFlowExpression: (_node, index, parent) => {
    // TODO: store an error entry

    // const mdxFlowExpression = node as Partial<MdxJsxFlowElement>
    if (!index || !parent) {
      return SKIP
    }

    parent.children.splice(index, 1)

    return index
  },
  mdxJsxTextElement: (node) => {
    const mdxJsxTextElement = node as Partial<MdxJsxTextElement>

    if (!mdxJsxTextElement.name) {
      // TODO: probably shouldn't just bail
      throw new Error('mdxJsxTextElement was missing a component name')
    }

    node.nodeType = mdxJsxTextElement.name

    if (mdxJsxTextElement.attributes) {
      node.props = convertAttributesToProps(mdxJsxTextElement.attributes)
    }

    delete mdxJsxTextElement.attributes
    delete mdxJsxTextElement.name
  },
  paragraph: (node) => {
    node.nodeType = 'paragraph'
  },
  root: (node) => {
    node.nodeType = 'document'
  },
  text: (node) => {
    // This is basically a dummy component
    node.nodeType = 'text'
  }
}

function process(srcMdx: string) {
  const result = processor.parse(srcMdx)

  visit(result, visitor)

  return result as Renderable<typeof result> & RmdxRoot
}

export { process }
