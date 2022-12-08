/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { StorybookDemo, Variant } from '@carbon-platform/mdx-components'
import { peek } from '@carbon-platform/rmdx'
import React from 'react'

/** @type {import('@carbon-platform/rmdx').Renderer} */
export const StorybookDemoRenderer = ({ children, tall, themeSelector, wide, url }) => {
  return (
    <StorybookDemo tall={tall} themeSelector={themeSelector} wide={wide} url={url}>
      {React.Children.map(children, (child) => (
        <Variant label={peek(child).props.label} variant={peek(child).props.variant} />
      ))}
    </StorybookDemo>
  )
}
