/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { peek } from '@carbon-platform/rmdx'
import React from 'react'

import H1 from '@/components/markdown/h1'

/** @type {import('@carbon-platform/rmdx').Renderer} */
export const Heading1Renderer = ({ children }) => {
  const actualChildren = React.Children.map(children, (child) => {
    return peek(child)
  })

  const ariaLabel = actualChildren.join(' ')

  return <H1 fullText={ariaLabel}>{children}</H1>
}
