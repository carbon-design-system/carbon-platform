/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import TypeSetStyle from '@/components/typeset-style'

const stories = {
  title: 'Platform/Components/TypeSetStyle',
  component: TypeSetStyle,
  argTypes: {},
  parameters: {}
}

export default stories

const Template = (args) => <TypeSetStyle typesets="smallStyle" {...args} />

export const Default = Template.bind({})
Default.args = {}

export const Body = Template.bind({})
Body.args = {
  typesets: 'body'
}

export const FixedHeadings = Template.bind({})
FixedHeadings.args = {
  typesets: 'fixedHeadings'
}

export const FluidHeadings = Template.bind({})
FluidHeadings.args = {
  typesets: 'fluidHeadings',
  breakpointControls: true
}

export const FluidDisplay = Template.bind({})
FluidDisplay.args = {
  typesets: 'fluidCallouts,fluidDisplay',
  breakpointControls: true
}
