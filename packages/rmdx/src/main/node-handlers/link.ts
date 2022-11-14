/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Link } from 'mdast'

import { NodeHandler } from '../interfaces.js'

const link: NodeHandler = (data) => {
  const link = data.node as Partial<Link>

  data.node.nodeType = 'link'
  data.node.props = {
    href: link?.url || ''
  }

  delete link.url
  delete link.title
}

export { link }
