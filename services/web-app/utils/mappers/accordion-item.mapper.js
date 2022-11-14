/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AccordionItem as CarbonAccordionItem } from '@carbon-platform/mdx-components'

export const AccordionItemMapper = ({ children, disabled, open, title }) => (
  <CarbonAccordionItem disabled={disabled} open={open} title={title}>
    {children}
  </CarbonAccordionItem>
)
