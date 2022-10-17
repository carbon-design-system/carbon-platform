/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Blockquote, P } from '../../../dist/main/index'

const stories = {
  title: 'Components/Blockquote',
  component: Blockquote
}

export default stories

const Template = (args) => (
  <Blockquote {...args}>
    <P>This is a quote</P>
  </Blockquote>
)

export const Default = Template.bind({})
Default.args = {}
