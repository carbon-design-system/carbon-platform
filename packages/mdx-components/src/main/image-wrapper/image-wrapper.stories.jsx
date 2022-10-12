/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ImageWrapper } from '../../../dist/main/index'
import accordionStyle3Png from '../../res/accordion-style-3.png'

const stories = {
  title: 'Components/ImageWrapper',
  component: ImageWrapper,
  argTypes: {
    children: {
      control: false
    }
  }
}

export default stories

const Template = (args) => (
  <ImageWrapper type="fixed" {...args}>
    <img alt="fixed demo" src={accordionStyle3Png} />
  </ImageWrapper>
)

export const Default = Template.bind({})
Default.args = {}
