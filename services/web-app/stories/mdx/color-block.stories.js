/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'

import ColorBlock from '@/components/color-block'

const stories = {
  title: 'MDX/ColorBlock',
  component: ColorBlock,
  argTypes: {},
  parameters: {}
}

export default stories

const Template = (args) => (
  <ColorBlock size="xs" {...args}>
    #f4f4f4
  </ColorBlock>
)

export const Default = Template.bind({})
Default.args = {}
