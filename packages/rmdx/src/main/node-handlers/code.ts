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
  // TODOASKJOE: do you like this?
  const meta = nodeAsCode.meta?.split(' ')
  let src, path
  meta?.forEach((metaItem) => {
    const split = metaItem?.split('=')

    if (split?.[0] === 'src') {
      src = split?.[1]
    } else if (split?.[0] === 'path') {
      path = split?.[1]
    }
  })
  data.node.props.lang = nodeAsCode.lang ? `language-${nodeAsCode.lang}` : 'language-plain'
  data.node.props.src = src || ''
  data.node.props.path = path || ''
  data.node.props.code = nodeAsCode.value || ''

  delete nodeAsCode.lang
  delete nodeAsCode.meta
  delete nodeAsCode.value
}

export { code }
