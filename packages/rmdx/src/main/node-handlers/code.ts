/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Code } from 'mdast'

import { NodeHandler } from '../interfaces.js'

const code: NodeHandler = (data) => {
  const nodeAsCode = data.node as Partial<Code>

  data.node.nodeType = 'code'

  data.node.props.meta = nodeAsCode.meta || ''
  data.node.props.lang = nodeAsCode.lang || ''

  delete nodeAsCode.lang
  delete nodeAsCode.meta
}

export { code }
