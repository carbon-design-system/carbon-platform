/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { H1, H2, H3, H4, H5, H6 } from '../../../dist/main/index'

const stories = {
  title: 'Components/Headings',
  component: H1,
  argTypes: {
    children: {
      control: false
    },
    className: {
      control: false
    },
    headingClassName: {
      control: false
    }
  }
}

export default stories

const H1Template = (args) => (
  <>
    <H1 {...args}>This is a Heading 1</H1>
    <H2 {...args}>This is a Heading 2</H2>
    <H3 {...args}>This is a Heading 3</H3>
    <H4 {...args}>This is a Heading 4</H4>
    <H5 {...args}>This is a Heading 5</H5>
    <H6 {...args}>This is a Heading 6</H6>
  </>
)

export const Default = H1Template.bind({})
Default.args = {}
