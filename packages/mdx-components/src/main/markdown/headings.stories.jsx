/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { H1, H2, H3, H4, H5, H6 } from '../../../dist/main/index'

const stories = {
  title: 'Components/Headings/headings',
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

const H1Template = (args) => <H1 {...args}>This is a Heading 1</H1>

const H2Template = (args) => <H2 {...args}>This is a Heading 2</H2>

const H3Template = (args) => <H3 {...args}>This is a Heading 3</H3>
const H4Template = (args) => <H4 {...args}>This is a Heading 4</H4>

const H5Template = (args) => <H5 {...args}>This is a Heading 5</H5>

const H6Template = (args) => <H6 {...args}>This is a Heading 6</H6>

export const Default = H1Template.bind({})
Default.args = {}

export const h1 = H1Template.bind({})
h1.args = {}

export const h2 = H2Template.bind({})
h2.args = {}

export const h3 = H3Template.bind({})
h3.args = {}

export const h4 = H4Template.bind({})
h4.args = {}

export const h5 = H5Template.bind({})
h5.args = {}

export const h6 = H6Template.bind({})
h6.args = {}
