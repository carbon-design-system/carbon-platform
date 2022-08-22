/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { AnchorLink, AnchorLinks } from '../../../dist/main/index'

export default {
  title: 'Components/AnchorLinks',
  component: AnchorLinks,
  subcomponents: { AnchorLink },
  argTypes: {
    small: {
      control: 'boolean'
    }
  }
}

const Template = (args) => (
  <AnchorLinks {...args}>
    <AnchorLink>Link 1</AnchorLink>
    <AnchorLink>Link 2</AnchorLink>
    <AnchorLink>Link 3</AnchorLink>
    <AnchorLink>Link 4</AnchorLink>
    <AnchorLink>Link 5</AnchorLink>
    <AnchorLink>Link 6</AnchorLink>
    <AnchorLink>Link 7</AnchorLink>
  </AnchorLinks>
)

export const Default = Template.bind({})
Default.args = {
  small: false
}

export const Small = Template.bind({})
Small.args = {
  small: true
}
