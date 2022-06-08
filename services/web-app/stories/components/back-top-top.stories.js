/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import BackToTop from '@/components/back-to-top'

const stories = {
  title: 'Platform/Components/BackToTop',
  component: BackToTop,
  argTypes: {
    alwaysVisible: {
      control: false
    }
  },
  parameters: {}
}

export default stories

const Template = (args) => <BackToTop alwaysVisible {...args} />

export const Default = Template.bind({})
Default.args = {}
