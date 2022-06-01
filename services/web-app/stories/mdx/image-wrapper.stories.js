/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Image from 'next/image'

import ImageWrapper from '@/components/image-wrapper'

const stories = {
  title: 'MDX/ImageWrapper',
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
    <Image alt="fixed demo" src="mdx/accordion-style-3.png" />
  </ImageWrapper>
)

export const Default = Template.bind({})
Default.args = {}
