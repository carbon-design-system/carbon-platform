/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Title } from '../../../dist/main/index.js'

export default {
  title: 'Components/Title',
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

const Template = (args) => <Title {...args}>Lorem ipsum</Title>

export const Default = Template.bind({})
Default.args = {}

const WithSiblingTemplate = (args) => (
  <>
    <Title {...args}>Lorem ipsum</Title>
    <div>This is the element after the title</div>
  </>
)

export const WithSibling = WithSiblingTemplate.bind({})
WithSibling.args = {}
