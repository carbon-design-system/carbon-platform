/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Code } from '../../../dist/main/index'

export default {
  title: 'Components/Markdown/Code',
  component: Code
}

const Template = (args) => (
  <Code {...args}>
    <code>const a = 16</code>
  </Code>
)

export const Default = Template.bind({})
Default.args = {}
