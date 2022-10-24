/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ColorGrid } from '../../../dist/main/index'

const stories = {
  title: 'Components/ColorGrid',
  component: ColorGrid,
  argTypes: {},
  parameters: {}
}

export default stories

const Template = (args) => <ColorGrid colorFamily="blue" {...args} />

export const Default = Template.bind({})
Default.args = {}
