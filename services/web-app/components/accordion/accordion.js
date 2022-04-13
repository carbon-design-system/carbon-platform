/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Accordion as CarbonAccordion, Column, Grid } from '@carbon/react'
import clsx from 'clsx'

import styles from './accordion.module.scss'

const Accordion = ({ className, ...rest }) => (
  <Grid narrow>
    <Column sm={4} md={8} lg={8}>
      <CarbonAccordion size="xl" {...rest} className={clsx(className, styles.accordion)} />
    </Column>
  </Grid>
)
export default Accordion
