/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Button } from '@carbon/react'
import { Launch } from '@carbon/react/icons'
import PropTypes from 'prop-types'
import React, { ReactNode } from 'react'

import { MdxComponent } from '../../interfaces.js'

interface LaunchButtonProps {
  children: ReactNode
  href?: string | null
  isExpressive?: boolean | null
  kind?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'ghost' | 'danger--primary' | null
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | null
}

const LaunchButton: MdxComponent<LaunchButtonProps> = ({
  children,
  href,
  isExpressive,
  kind,
  size
}) => (
  <Button renderIcon={Launch} href={href} isExpressive={isExpressive} kind={kind} size={size}>
    {children}
  </Button>
)

LaunchButton.propTypes = {
  /**
   * Specify how the button itself should be rendered.
   * Make sure to apply all props to the root node and render children appropriately
   */
  children: PropTypes.node,
  /**
   * Optionally specify an href for your Button to become an <a> element
   */
  href: PropTypes.string,
  /**
   * Specify whether the Button is expressive, or not
   */
  isExpressive: PropTypes.bool,
  /**
   * Specify whether the Button is currently selected. Only applies to the Ghost variant.
   */
  kind: PropTypes.oneOf<LaunchButtonProps['kind']>([
    'primary',
    'secondary',
    'tertiary',
    'danger',
    'ghost',
    'danger--primary'
  ]),
  /**
   *  Optional prop to specify the size of the Button
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', '2xl'])
}

export { LaunchButtonProps }
export default LaunchButton
