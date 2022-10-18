/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { TypeWeight } from '../../../dist/main/index'

export default {
  title: 'Internal Components/TypeWeight',
  component: TypeWeight,
  argTypes: {},
  parameters: {}
}

const Template = (args) => <TypeWeight {...args} />

export const Default = Template.bind({})
Default.args = {}

export const Italic = Template.bind({})
Italic.args = {
  type: 'italic'
}

export const Types = Template.bind({})
Types.args = {
  type: 'types'
}
