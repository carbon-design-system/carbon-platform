/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { P } from '@carbon-platform/mdx-components'
import { peek } from '@carbon-platform/rmdx'
import React from 'react'

/** @type {import('@carbon-platform/rmdx').Renderer} */
export const ParagraphRenderer = ({ children, large, parentNodeType }) => {
  const wrapsImages = React.Children.map(children, (child) => {
    return peek(child).nodeType === 'image'
  }).some((val) => !!val)

  const isWrappedByListItem = parentNodeType === 'list-item'

  if (isWrappedByListItem || wrapsImages) {
    return children
  } else {
    return <P large={large}>{children}</P>
  }
}
