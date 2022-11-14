/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { MdxJsxTextElement } from 'mdast-util-mdx-jsx'

import { convertAttributesToProps } from '../convert-attributes-to-props.js'
import { NodeHandler } from '../interfaces.js'

const mdxJsxTextElement: NodeHandler = (data) => {
  const mdxJsxTextElement = data.node as Partial<MdxJsxTextElement>

  if (!mdxJsxTextElement.name) {
    // TODO: probably shouldn't just bail
    throw new Error('MdxJsxTextElement missing component name')
  }

  if (!data.allowedComponents.includes(mdxJsxTextElement.name)) {
    // TODO: probably shouldn't just bail
    throw new Error('Unrecognized JSX component: ' + mdxJsxTextElement.name)
  }

  data.node.nodeType = mdxJsxTextElement.name

  if (mdxJsxTextElement.attributes) {
    data.node.props = convertAttributesToProps(mdxJsxTextElement.attributes)
  }

  delete mdxJsxTextElement.attributes
  delete mdxJsxTextElement.name
}

export { mdxJsxTextElement }
