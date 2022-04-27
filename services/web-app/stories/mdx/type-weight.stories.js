/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'

import { TypeWeight } from '@/components/type'

const stories = {
  title: 'MDX/TypeWeight',
  component: TypeWeight,
  argTypes: {},
  parameters: {}
}

export default stories

const Template = (args) => <TypeWeight {...args} />

export const Default = Template.bind({})
Default.args = {}
