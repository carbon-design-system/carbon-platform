/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Caption from '@/components/caption'

const stories = {
  title: 'MDX/Caption',
  component: Caption
}

export default stories

const Template = (args) => (
  <Caption {...args}>Lorem ipsum dolor sit amet Lorem Lorem Lorem Lorem Lorem Lorem ipsum.</Caption>
)

export const Default = Template.bind({})
Default.args = {}
