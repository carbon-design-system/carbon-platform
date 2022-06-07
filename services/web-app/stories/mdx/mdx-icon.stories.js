/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import MdxIcon, { acceptedCompNames } from '@/components/mdx-icon'

const stories = {
  title: 'MDX/MdxIcon',
  component: MdxIcon,
  argTypes: {
    name: { control: { type: 'select', options: acceptedCompNames.sort() } }
  },
  parameters: {
    viewMode: 'canvas'
  }
}

export default stories

const Template = (args) => <MdxIcon {...args} />

export const Default = Template.bind({})
Default.args = {
  name: 'sketch'
}
