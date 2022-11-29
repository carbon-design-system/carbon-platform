/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LaunchButton } from '../../../../dist/main/index'

export default {
  title: 'Components/Buttons/LaunchButton',
  component: LaunchButton,
  argTypes: {
    children: {
      control: false
    }
  }
}

const Template = (args) => <LaunchButton {...args}>Button text</LaunchButton>

export const Default = Template.bind({})
Default.args = {}
