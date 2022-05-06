/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Image from 'next/image'

import ArtDirection from '@/components/art-direction'

const stories = {
  title: 'MDX/ArtDirection',
  component: ArtDirection,
  argTypes: {
    children: {
      control: false
    }
  }
}

export default stories

const Template = (args) => (
  <ArtDirection {...args}>
    <Image alt="mobile" src="mdx/mobile.jpg" />
    <Image alt="tablet" src="mdx/tablet.jpg" />
    <Image alt="desktop" src="mdx/desktop.jpg" />
  </ArtDirection>
)

export const Default = Template.bind({})
Default.args = {}
