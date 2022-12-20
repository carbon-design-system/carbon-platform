/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { AnchorLinks } from '@carbon-platform/mdx-components'
import { peek, unwrap } from '@carbon-platform/rmdx'
import React from 'react'

/** @type {import('@carbon-platform/rmdx').Renderer} */
export const AnchorLinksRenderer = ({ children }) => {
  const unwrappedChildren = unwrap(children).filter(
    (uChild) => peek(uChild).nodeType === 'AnchorLink'
  )

  return <AnchorLinks>{unwrappedChildren}</AnchorLinks>
}
