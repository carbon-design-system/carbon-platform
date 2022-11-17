/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Image } from 'mdast'

import { NodeHandler, RmdxScalar } from '../interfaces.js'

const image: NodeHandler = (data) => {
  const nodeAsImage = data.node as Partial<Image>
  const nodeAsRmdxScalar = data.node as RmdxScalar

  data.node.nodeType = 'image'
  data.node.props = {
    alt: nodeAsImage.alt || ''
  }
  nodeAsRmdxScalar.value = nodeAsImage.url || ''

  delete nodeAsImage.alt
  delete nodeAsImage.title
  delete nodeAsImage.url
}

export { image }
