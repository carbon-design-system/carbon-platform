/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Image } from 'mdast'

import { NodeHandler } from '../interfaces.js'

const image: NodeHandler = (data) => {
  const nodeAsImage = data.node as Partial<Image>

  data.node.nodeType = 'image'
  data.node.props.alt = nodeAsImage.alt || ''
  data.node.props.src = nodeAsImage.url || ''

  delete nodeAsImage.alt
  delete nodeAsImage.title
  delete nodeAsImage.url
}

export { image }
