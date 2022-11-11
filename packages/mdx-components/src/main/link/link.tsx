/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Link as CarbonLink } from '@carbon/react'
import { clsx } from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'

import { MdxComponent } from '../interfaces.js'
import { withPrefix } from '../utils.js'

interface LinkProps {
  className?: string | null
  [otherProp: string]: unknown
}

/**
 * For MDX files, steer away from using JSX components
 * for link in favor of standard markdown syntax.
 *
 * ```
 * > [Carbon Platform Storybook](https://platform.carbondesignsystem.com)
 * ```
 */
const Link: MdxComponent<LinkProps> = ({ className, ...rest }) => (
  <CarbonLink inline {...rest} className={clsx(className, withPrefix('link'))} />
)

Link.propTypes = {
  /**
   * Specify optional className
   */
  className: PropTypes.string
}

export { LinkProps }
export default Link
