/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ArrowRightLink } from '../../../../dist/main/index'

export default {
  title: 'Components/Links/ArrowRightLink',
  component: ArrowRightLink,
  argTypes: {
    className: {
      control: false
    }
  }
}

const Template = (args) => (
  <ArrowRightLink href="https://platform.carbondesignsystem.com" {...args}>
    Carbon Platform Storybook
  </ArrowRightLink>
)

export const Default = Template.bind({})
Default.args = {}
