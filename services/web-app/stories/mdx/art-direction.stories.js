/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import ArtDirection from '@/components/art-direction'

const stories = {
  title: 'MDX/ArtDirection',
  component: ArtDirection
}

export default stories

const Template = (args) => (
  <ArtDirection {...args}>
    <img alt="mobile" src="mdx/mobile.jpg" />
    <img alt="tablet" src="mdx/tablet.jpg" />
    <img alt="desktop" src="mdx/desktop.jpg" />
  </ArtDirection>
)

export const Default = Template.bind({})
Default.args = {}
