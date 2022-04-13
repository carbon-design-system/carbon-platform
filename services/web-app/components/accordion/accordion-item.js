/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AccordionItem as CarbonAccordionItem } from '@carbon/react'
import clsx from 'clsx'
import PropTypes from 'prop-types'

const AccordionItem = ({ className, children, ...rest }) => (
  <CarbonAccordionItem {...rest} className={clsx(className)}>
    {children}
  </CarbonAccordionItem>
)

AccordionItem.propTypes = {
  className: PropTypes.string
}

export default AccordionItem
