/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Link as CarbonLink } from '@carbon/react'
import { clsx } from 'clsx'
import PropTypes from 'prop-types'
import React, { ReactNode } from 'react'

import { MdxComponent } from '../interfaces.js'
import { withPrefix } from '../utils.js'

interface LinkProps {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | null
  href: string
}

/**
 * For MDX files, steer away from using JSX components
 * for link in favor of standard markdown syntax.
 *
 * ```
 * > [Carbon Platform Storybook](https://platform.carbondesignsystem.com)
 * ```
 */
const Link: MdxComponent<LinkProps> = ({ href, children, size }) => (
  <CarbonLink href={href} className={clsx(withPrefix('link'))} inline size={size}>
    {children}
  </CarbonLink>
)

Link.propTypes = {
  /**
   * Specify optional children
   */
  children: PropTypes.node.isRequired,
  /**
   * Provide the href attribute for the <a> node
   */
  href: PropTypes.string.isRequired,
  /**
   * Specify the size of the Link.
   * Currently supports either sm, 'md' (default) or 'lg` as an option.
   */
  size: PropTypes.oneOf<LinkProps['size']>(['lg', 'sm', 'md'])
}

export { LinkProps }
export default Link
