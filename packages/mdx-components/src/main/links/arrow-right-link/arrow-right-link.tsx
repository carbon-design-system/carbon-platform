/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Link as CarbonLink } from '@carbon/react'
import { ArrowRight } from '@carbon/react/icons'
import PropTypes from 'prop-types'
import React, { ReactNode } from 'react'

import { MdxComponent } from '../../interfaces.js'
import { withPrefix } from '../../utils.js'

interface ArrowRightLinkProps {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | null
  href: string
}

/**
 * Used to explicitly specify a button with an ArrowRight icon.
 */
const ArrowRightLink: MdxComponent<ArrowRightLinkProps> = ({ href, children, size }) => (
  <CarbonLink href={href} renderIcon={ArrowRight} className={withPrefix('link')} size={size}>
    {children}
  </CarbonLink>
)

ArrowRightLink.propTypes = {
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
  size: PropTypes.oneOf<ArrowRightLinkProps['size']>(['lg', 'sm', 'md'])
}

export { ArrowRightLinkProps }
export default ArrowRightLink
