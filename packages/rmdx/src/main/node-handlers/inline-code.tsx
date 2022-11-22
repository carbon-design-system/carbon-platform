/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { InlineCode } from 'mdast'

import { NodeHandler } from '../interfaces.js'

const inlineCode: NodeHandler = (data) => {
  const nodeAsInlineCode = data.node as Partial<InlineCode>
  data.node.nodeType = 'inline-code'
  data.node.props.code = nodeAsInlineCode.value || ''

  delete nodeAsInlineCode.value
}

export { inlineCode }
