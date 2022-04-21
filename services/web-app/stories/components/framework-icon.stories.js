/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'

import FrameworkIcon from '@/components/framework-icon/framework-icon'

const stories = {
  title: 'Components/FrameworkIcon',
  component: FrameworkIcon
}

export default stories

const Template = (args) => <FrameworkIcon {...args} />

export const Default = Template.bind({})
Default.args = {
  framework: 'react'
}

export const WithCount = Template.bind({})
WithCount.args = {
  framework: 'react',
  otherCount: 4
}
