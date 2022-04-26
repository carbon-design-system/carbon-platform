/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Accordion as CarbonAccordion, Column, Grid } from '@carbon/react'
import clsx from 'clsx'
import PropTypes from 'prop-types'

import styles from './accordion.module.scss'

/**
 * The `<Accordion>` and `<AccordionItem>` components are used together to display a list of content
 * sections that can be toggled open by clicking the respective title of each section.
 */
const Accordion = ({ className, ...rest }) => (
  <Grid narrow>
    <Column sm={4} md={8} lg={8}>
      <CarbonAccordion size="xl" {...rest} className={clsx(className, styles.accordion)} />
    </Column>
  </Grid>
)

Accordion.propTypes = {
  /**
   * Optional class name on the accordion.
   */
  className: PropTypes.string
}

export default Accordion
