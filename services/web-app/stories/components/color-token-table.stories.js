/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import ColorTokenTable from '@/components/color-token-table'

const stories = {
  title: 'Platform/Components/ColorTokenTable',
  component: ColorTokenTable,
  argTypes: {},
  parameters: {}
}

export default stories

const Template = (args) => <ColorTokenTable {...args} />

export const Default = Template.bind({})
Default.args = {}
