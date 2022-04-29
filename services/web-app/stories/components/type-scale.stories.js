/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { TypeScaleTable } from '@/components/type'

const stories = {
  title: 'Platform/Components/TypeScaleTable',
  component: TypeScaleTable,
  argTypes: {},
  parameters: {}
}

export default stories

const Template = (args) => <TypeScaleTable {...args} />

export const Default = Template.bind({})
Default.args = {}
