/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { MdxJsxFlowElement } from 'mdast-util-mdx-jsx'
import { CONTINUE } from 'unist-util-visit'

import { convertAttributesToProps } from '../convert-attributes-to-props.js'
import { ErrorNode } from '../error-node.js'
import { UnknownComponentException } from '../exceptions/unknown-component-exception.js'
import { UnnamedComponentException } from '../exceptions/unnamed-component-exception.js'
import { NodeHandler } from '../interfaces.js'
import { replaceNode } from '../replace-node.js'

/**
 * Handles an mdxJsxFlowElement by parsing it and filtering out disallowed props.
 *
 * Example: `<Wowow />'`
 *
 * @param data Incoming data for this node.
 * @returns a VisitorResult
 */
const mdxJsxFlowElement: NodeHandler = (data, { onError }) => {
  const nodeAsMdxJsxFlowElement = data.node as Partial<MdxJsxFlowElement>

  // Guard - component had no name (e.g. a Fragment)
  if (!nodeAsMdxJsxFlowElement.name) {
    const errorIndex = onError(new UnnamedComponentException('', data.node.position))

    return replaceNode(data, new ErrorNode(errorIndex).serialize())
  }

  // Guard - unknown component. Replace with an error node
  if (!data.allowedComponents.includes(nodeAsMdxJsxFlowElement.name)) {
    const errorIndex = onError(
      new UnknownComponentException(nodeAsMdxJsxFlowElement.name, data.node.position)
    )

    return replaceNode(data, new ErrorNode(errorIndex).serialize())
  }

  data.node.nodeType = nodeAsMdxJsxFlowElement.name

  if (nodeAsMdxJsxFlowElement.attributes) {
    data.node.props = {
      ...data.node.props,
      ...convertAttributesToProps(nodeAsMdxJsxFlowElement.attributes)
    }
  }

  delete nodeAsMdxJsxFlowElement.attributes
  delete nodeAsMdxJsxFlowElement.name

  return CONTINUE
}

export { mdxJsxFlowElement }
