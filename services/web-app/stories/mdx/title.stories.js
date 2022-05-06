/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Title from '@/components/title'

const stories = {
  title: 'MDX/Title',
  component: Title,
  argTypes: {
    children: {
      control: false
    },
    className: {
      control: false
    }
  }
}

export default stories

const Template = (args) => <Title {...args}>Lorem ipsum</Title>

export const Default = Template.bind({})
Default.args = {}
