/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { MdxJsxFlowElement } from 'mdast-util-mdx-jsx'

import { convertAttributesToProps } from '../convert-attributes-to-props.js'
import { NodeHandler } from '../interfaces.js'

const mdxJsxFlowElement: NodeHandler = (data) => {
  const mdxJsxFlowElement = data.node as Partial<MdxJsxFlowElement>

  if (!mdxJsxFlowElement.name) {
    // TODO: probably shouldn't just bail
    throw new Error('MdxJsxFlowElement missing component name')
  }

  if (!data.allowedComponents.includes(mdxJsxFlowElement.name)) {
    // TODO: probably shouldn't just bail
    throw new Error('Unrecognized JSX component: ' + mdxJsxFlowElement.name)
  }

  data.node.nodeType = mdxJsxFlowElement.name

  if (mdxJsxFlowElement.attributes) {
    data.node.props = convertAttributesToProps(mdxJsxFlowElement.attributes)
  }

  delete mdxJsxFlowElement.attributes
  delete mdxJsxFlowElement.name
}

export { mdxJsxFlowElement }
