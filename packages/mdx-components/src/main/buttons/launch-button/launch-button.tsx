/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Button } from '@carbon/react'
import { Launch } from '@carbon/react/icons'
import PropTypes from 'prop-types'
import React, { ElementType, ReactNode } from 'react'

import { MdxComponent } from '../../interfaces.js'

interface LaunchButtonProps {
  children: ReactNode
  as?: string | ElementType | null
  dangerDescription?: string | null
  disabled?: boolean | null
  hasIconOnly?: boolean | null
  href?: string | null
  isExpressive?: boolean | null
  isSelected?: boolean | null
  kind?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'ghost' | 'danger--primary' | null
  role?: string | null
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | null
  tabIndex?: number | null
  tooltipAlignment?: 'start' | 'center' | 'end' | null
  tooltipPosition?: 'top' | 'right' | 'bottom' | 'left' | null
  type?: 'button' | 'reset' | 'submit' | null
}

const LaunchButton: MdxComponent<LaunchButtonProps> = ({
  children,
  as,
  dangerDescription,
  disabled,
  hasIconOnly,
  href,
  isExpressive,
  isSelected,
  kind,
  role,
  size,
  tabIndex,
  tooltipAlignment,
  tooltipPosition,
  type
}) => (
  <Button
    renderIcon={Launch}
    as={as}
    dangerDescription={dangerDescription}
    disabled={disabled}
    hasIconOnly={hasIconOnly}
    href={href}
    isExpressive={isExpressive}
    isSelected={isSelected}
    kind={kind}
    role={role}
    size={size}
    tabIndex={tabIndex}
    tooltipAlignment={tooltipAlignment}
    tooltipPosition={tooltipPosition}
    type={type}
  >
    {children}
  </Button>
)

LaunchButton.propTypes = {
  /**
   * Specify how the button itself should be rendered.
   * Make sure to apply all props to the root node and render children appropriately
   */
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  /**
   * Speficy any children passed into the Caption component
   */
  children: PropTypes.node,
  /**
   * Specify the message read by screen readers for the danger button variant
   */
  dangerDescription: PropTypes.string,
  /**
   * Specify whether the Button should be disabled, or not
   */
  disabled: PropTypes.bool,
  /**
   * Specify if the button is an icon-only button
   */
  hasIconOnly: PropTypes.bool,
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
  isSelected: PropTypes.bool,
  /**
   * Specify the kind of Button you want to create
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
   * Optional prop to specify the role of the Button
   */
  role: PropTypes.string,
  /**
   *  Optional prop to specify the size of the Button
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', '2xl']),
  /**
   * Optional prop to specify the tabIndex of the Button
   */
  tabIndex: PropTypes.number,
  /**
   * Optional prop to specify the tooltip alignment of the Button
   */
  tooltipAlignment: PropTypes.oneOf<LaunchButtonProps['tooltipAlignment']>([
    'start',
    'center',
    'end'
  ]),
  /**
   * Optional prop to specify the tooptip position of the Button
   */
  tooltipPosition: PropTypes.oneOf<LaunchButtonProps['tooltipPosition']>([
    'top',
    'right',
    'bottom',
    'left'
  ]),
  /**
   * Optional prop to specify the type of the Button
   */
  type: PropTypes.oneOf<LaunchButtonProps['type']>(['button', 'reset', 'submit'])
}

export { LaunchButtonProps }
export default LaunchButton
