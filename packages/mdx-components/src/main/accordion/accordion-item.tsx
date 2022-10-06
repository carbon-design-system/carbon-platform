/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AccordionItem as CarbonAccordionItem } from '@carbon/react'
import PropTypes from 'prop-types'
import React from 'react'

import { MdxComponent } from '../interfaces.js'

interface AccordionItemProps {
  children: string
  className: string
  title: string
}

const AccordionItem: MdxComponent<AccordionItemProps> = ({ className, children, ...rest }) => (
  <CarbonAccordionItem {...rest} className={className}>
    {children}
  </CarbonAccordionItem>
)

AccordionItem.propTypes = {
  /**
   * Provide the contents of your `AccordionItem`.
   */
  children: PropTypes.node.isRequired,
  /**
   * Optional container class name.
   */
  className: PropTypes.string,
  /**
   * Provide the title of your `AccordionItem`.
   */
  title: PropTypes.string.isRequired
}

export { AccordionItemProps }
export default AccordionItem
