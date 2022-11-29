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
  disabled?: boolean | null
  size?: 'sm' | 'md' | 'lg' | null
  visited?: boolean | null
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
const Link: MdxComponent<LinkProps> = ({ href, children, disabled, size, visited }) => (
  <CarbonLink
    href={href}
    className={clsx(withPrefix('link'))}
    inline
    disabled={disabled}
    size={size}
    visited={visited}
  >
    {children}
  </CarbonLink>
)

Link.defaultProps = {
  disabled: false,
  visited: false
}

Link.propTypes = {
  /**
   * Specify optional children
   */
  children: PropTypes.node.isRequired,
  /**
   * Specify if the control should be disabled, or not
   */
  disabled: PropTypes.bool,
  /**
   * Provide the href attribute for the <a> node
   */
  href: PropTypes.string.isRequired,
  /**
   * Specify the size of the Link.
   * Currently supports either sm, 'md' (default) or 'lg` as an option.
   */
  size: PropTypes.oneOf<LinkProps['size']>(['lg', 'sm', 'md']),
  /**
   * Specify whether you want the link to receive visited styles after the link has been clicked
   */
  visited: PropTypes.bool
}

export { LinkProps }
export default Link
