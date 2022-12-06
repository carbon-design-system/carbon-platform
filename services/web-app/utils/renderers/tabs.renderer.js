/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/** @type {import('@carbon-platform/rmdx').Renderer} */
import { Tabs } from '@carbon-platform/mdx-components'
import React from 'react'

import { useId } from '../use-id'

export const TabsRenderer = ({ children }) => {
  const id = useId('tabs')

  React.Children.forEach(children, (child, index) => {
    child.props.astNode.props._id = `${id}__${index}`
    child.props.astNode.props.index = index
  })
  return <Tabs idPrefix={id}>{children}</Tabs>
}
