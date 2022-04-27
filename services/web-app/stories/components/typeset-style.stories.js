/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'

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

export const fixedHeadings = Template.bind({})
fixedHeadings.args = {
  typesets: 'fixedHeadings'
}

export const fluidHeadings = Template.bind({})
fluidHeadings.args = {
  typesets: 'fluidHeadings',
  breakpointControls: true
}

export const fluidDisplay = Template.bind({})
fluidDisplay.args = {
  typesets: 'fluidCallouts,fluidDisplay',
  breakpointControls: true
}
