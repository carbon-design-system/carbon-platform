/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'

import FrameworkIcon from '@/components/framework-icon/framework-icon'
import { framework as frameworkMap } from '@/data/framework'

const stories = {
  title: 'Components/FrameworkIcon',
  component: FrameworkIcon,
  argTypes: {
    framework: {
      options: Object.keys(frameworkMap)
    },
    otherCount: {
      control: {
        type: 'number',
        min: 0
      }
    }
  },
  parameters: {
    docs: {
      source: {
        state: 'open'
      }
    },
    viewMode: 'docs'
  }
}

export default stories

const Template = (args) => <FrameworkIcon {...args} />

export const Default = Template.bind({})
Default.args = {
  framework: 'angular'
}

export const WithCount = Template.bind({})
WithCount.args = {
  framework: 'react',
  otherCount: 4
}
