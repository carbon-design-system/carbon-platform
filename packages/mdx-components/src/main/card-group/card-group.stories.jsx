/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column } from '@carbon/react'

import { CardGroup } from '../../../dist/main/index'

export default {
  title: 'Components/CardGroup',
  component: CardGroup,
  argTypes: {
    children: {
      control: false
    },
    className: {
      control: false
    }
  }
}

const Template = () => (
  <CardGroup>
    <Column lg={4}>TODO: Add ResourceCard</Column>
    <Column lg={4}>TODO: Add ResourceCard</Column>
    <Column lg={4}>TODO: Add ResourceCard</Column>
    <Column lg={4}>TODO: Add ResourceCard</Column>
  </CardGroup>
)

export const Default = Template.bind({})
Default.args = {}
