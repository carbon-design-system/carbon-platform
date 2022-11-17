/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Image } from 'mdast'

import { NodeHandler } from '../interfaces.js'

const image: NodeHandler = (data) => {
  const image = data.node as Partial<Image>
  data.node.nodeType = 'image'
  data.node.props = {
    alt: image.alt || '',
    src: image.url || ''
  }
}

export { image }
