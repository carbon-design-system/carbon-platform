/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ColorPalette } from '../../../dist/main/index'

const stories = {
  title: 'Components/ColorPalette',
  component: ColorPalette,
  argTypes: {},
  parameters: {}
}

export default stories

const Template = (args) => <ColorPalette {...args} />

export const Default = Template.bind({})
Default.args = {
  type: 'categorical'
}

export const Grouped = Template.bind({})
Grouped.args = {
  type: 'grouped'
}

export const SequentialMono = Template.bind({})
SequentialMono.args = {
  type: 'sequential',
  isMono: true
}

export const SequentialDiverging = Template.bind({})
SequentialDiverging.args = {
  type: 'sequential',
  isDiverging: true
}

export const Alert = Template.bind({})
Alert.args = {
  type: 'alert',
  twoColumn: true
}

export const Status = Template.bind({})
Status.args = {
  type: 'status',
  twoColumn: true
}

export const StatusExtended = Template.bind({})
StatusExtended.args = {
  type: 'status-extended',
  shouldShowControls: false
}
