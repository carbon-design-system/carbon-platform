/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ArrowRightButton } from '../../../../dist/main/index'

export default {
  title: 'Components/Buttons/ArrowRightButton',
  component: ArrowRightButton,
  argTypes: {
    children: {
      control: false
    }
  }
}

const Template = (args) => <ArrowRightButton {...args}>Button text</ArrowRightButton>

export const Default = Template.bind({})
Default.args = {}
