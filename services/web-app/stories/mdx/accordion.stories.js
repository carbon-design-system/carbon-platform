/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Accordion, AccordionItem } from '@/components/accordion'

const stories = {
  title: 'MDX/Accordion',
  component: Accordion,
  subcomponents: { AccordionItem }
}

export default stories

const Template = (args) => (
  <Accordion {...args}>
    <AccordionItem title="Title 1">Content Section</AccordionItem>
    <AccordionItem title="Title 2">Content Section</AccordionItem>
    <AccordionItem title="Title 3">Content Section</AccordionItem>
  </Accordion>
)

export const Default = Template.bind({})
Default.args = {}
