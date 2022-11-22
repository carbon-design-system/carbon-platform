/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { StorybookDemo, Variant } from '@carbon-platform/mdx-components'
import React from 'react'

/** @type {import('@carbon-platform/rmdx').NodeMapper} */
export const StorybookDemoMapper = ({ children, tall, themeSelector, wide, url }) => {
  return (
    <StorybookDemo tall={tall} themeSelector={themeSelector} wide={wide} url={url}>
      {/* TODOASKJOE: is this what you meant? */}
      {React.Children.map(children, (child) => (
        <Variant
          label={child.props.astNode.props.label}
          variant={child.props.astNode.props.variant}
        />
      ))}
    </StorybookDemo>
  )
}
