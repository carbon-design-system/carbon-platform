/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ColorBlock } from '../../../dist/main/index'

export default {
  title: 'Components/ColorBlock',
  component: ColorBlock,
  argTypes: {},
  parameters: {}
}

const Template = (args) => <ColorBlock {...args}>#0066ff</ColorBlock>

export const Default = Template.bind({})
Default.args = {}
