/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { MdxJsxTextElement } from 'mdast-util-mdx-jsx'
import { CONTINUE } from 'unist-util-visit'

import { convertAttributesToProps } from '../convert-attributes-to-props.js'
import { ErrorNode } from '../error-node.js'
import { UnknownComponentException } from '../exceptions/unknown-component-exception.js'
import { UnnamedComponentException } from '../exceptions/unnamed-component-exception.js'
import { NodeHandler } from '../interfaces.js'
import { replaceNode } from '../replace-node.js'

/**
 * Handles an mdxJsxTextElement by parsing it and filtering out disallowed props.
 *
 * Example: `Hello <World />`
 *
 * @param data Incoming data for this node.
 * @returns a VisitorResult
 */
const mdxJsxTextElement: NodeHandler = (data, { onError }) => {
  const nodeAsMdxJsxTextElement = data.node as Partial<MdxJsxTextElement>

  // Guard - component had no name (e.g. a Fragment)
  if (!nodeAsMdxJsxTextElement.name) {
    const errorIndex = onError(new UnnamedComponentException('', data.node.position))

    return replaceNode(data, new ErrorNode(errorIndex).serialize())
  }

  // Guard - unknown component. Replace with an error node
  if (!data.allowedComponents.includes(nodeAsMdxJsxTextElement.name)) {
    const errorIndex = onError(
      new UnknownComponentException(nodeAsMdxJsxTextElement.name, data.node.position)
    )

    return replaceNode(data, new ErrorNode(errorIndex).serialize())
  }

  data.node.type = nodeAsMdxJsxTextElement.name

  if (nodeAsMdxJsxTextElement.attributes) {
    data.node.props = {
      ...data.node.props,
      ...convertAttributesToProps(nodeAsMdxJsxTextElement.attributes)
    }
  }

  delete nodeAsMdxJsxTextElement.attributes
  delete nodeAsMdxJsxTextElement.name

  return CONTINUE
}

export { mdxJsxTextElement }
