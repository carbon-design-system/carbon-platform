/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import GifPlayer from '@/components/gif-player'

const stories = {
  title: 'MDX/GifPlayer',
  component: GifPlayer
}

export default stories

const Template = (args) => (
  <GifPlayer {...args}>
    <img alt="animated" src="mdx/cloud.gif" />
    <img alt="static" src="mdx/cloud.jpg" />
  </GifPlayer>
)

export const Default = Template.bind({})
Default.args = {}
