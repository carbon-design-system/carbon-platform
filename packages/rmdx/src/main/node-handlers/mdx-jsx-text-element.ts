/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { MdxJsxTextElement } from 'mdast-util-mdx-jsx'

import { convertAttributesToProps } from '../convert-attributes-to-props.js'
import { NodeHandler } from '../interfaces.js'

/**
 * Handles an mdxJsxTextElement by parsing it and filtering out disallowed props.
 *
 * Example: `Hello <World />`
 *
 * @param data Incoming data for this node.
 * @returns a VisitorResult
 */
const mdxJsxTextElement: NodeHandler = (data) => {
  const nodeAsMdxJsxTextElement = data.node as Partial<MdxJsxTextElement>

  if (!nodeAsMdxJsxTextElement.name) {
    // TODO: probably shouldn't just bail
    throw new Error('MdxJsxTextElement missing component name')
  }

  if (!data.allowedComponents.includes(nodeAsMdxJsxTextElement.name)) {
    // TODO: probably shouldn't just bail
    throw new Error('Unrecognized JSX component: ' + nodeAsMdxJsxTextElement.name)
  }

  data.node.nodeType = nodeAsMdxJsxTextElement.name

  if (nodeAsMdxJsxTextElement.attributes) {
    data.node.props = {
      ...data.node.props,
      ...convertAttributesToProps(nodeAsMdxJsxTextElement.attributes)
    }
  }

  delete nodeAsMdxJsxTextElement.attributes
  delete nodeAsMdxJsxTextElement.name
}

export { mdxJsxTextElement }
