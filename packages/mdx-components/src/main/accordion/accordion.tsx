/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Accordion as CarbonAccordion, Column, Grid } from '@carbon/react'
import { clsx } from 'clsx'
import PropTypes from 'prop-types'
import React, { ReactNode } from 'react'

import { MdxComponent } from '../interfaces.js'
import { withPrefix } from '../utils.js'

interface AccordionProps {
  align?: 'start' | 'end' | null
  children: ReactNode
  disabled?: boolean | null
  isFlush?: boolean | null
}

/**
 * The `<Accordion>` and `<AccordionItem>` components are used together to display a list of content
 * sections that can be toggled open by clicking the respective title of each section.
 */
const Accordion: MdxComponent<AccordionProps> = ({ align, children, disabled, isFlush }) => (
  <Grid narrow>
    <Column sm={4} md={8} lg={8}>
      <CarbonAccordion
        size="md"
        className={clsx(withPrefix('accordion'))}
        align={align}
        disabled={disabled}
        isFlush={isFlush}
      >
        {children}
      </CarbonAccordion>
    </Column>
  </Grid>
)

Accordion.defaultProps = {
  align: 'end',
  disabled: false,
  isFlush: false
}

Accordion.propTypes = {
  /**
   * Specify the alignment of the accordion heading title and chevron.
   */
  align: PropTypes.oneOf<AccordionProps['align']>(['start', 'end']),
  /**
   * Pass in the children that will be rendered within the Accordion node
   */
  children: PropTypes.node.isRequired,
  /**
   * Specify whether an individual AccordionItem should be disabled
   */
  disabled: PropTypes.bool,
  /**
   * Specify whether Accordion text should be flush, default is false,
   * does not work with align="start"
   */
  isFlush: PropTypes.bool
}

export { AccordionProps }
export default Accordion
