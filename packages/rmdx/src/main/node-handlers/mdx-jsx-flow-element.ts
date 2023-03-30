/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { MdxJsxFlowElement } from 'mdast-util-mdx-jsx'

import { convertAttributesToProps } from '../convert-attributes-to-props.js'
import { NodeHandler } from '../interfaces.js'

/**
 * Handles an mdxJsxFlowElement by parsing it and filtering out disallowed props.
 *
 * Example: `<Wowow />'`
 *
 * @param data Incoming data for this node.
 * @returns a VisitorResult
 */
const mdxJsxFlowElement: NodeHandler = (data) => {
  const nodeAsMdxJsxFlowElement = data.node as Partial<MdxJsxFlowElement>

  if (!nodeAsMdxJsxFlowElement.name) {
    // TODO: probably shouldn't just bail
    throw new Error('MdxJsxFlowElement missing component name')
  }

  if (!data.allowedComponents.includes(nodeAsMdxJsxFlowElement.name)) {
    // TODO: probably shouldn't just bail
    throw new Error('Unrecognized JSX component: ' + nodeAsMdxJsxFlowElement.name)
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
}

export { mdxJsxFlowElement }
