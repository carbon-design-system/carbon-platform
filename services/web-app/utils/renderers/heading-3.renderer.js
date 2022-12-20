/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { H3 } from '@carbon-platform/mdx-components'
import { peek } from '@carbon-platform/rmdx'
import React from 'react'

/** @type {import('@carbon-platform/rmdx').Renderer} */
export const Heading3Renderer = ({ children }) => {
  const actualChildren = React.Children.map(children, (child) => {
    return peek(child)
  })

  const ariaLabel = actualChildren.join(' ')

  return <H3 fullText={ariaLabel}>{children}</H3>
}
