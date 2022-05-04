/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Video from '@/components/video'
import localPoster from '@/pages/mdx/video/local-poster.jpeg'
import localVideo from '@/pages/mdx/video/local-video.mp4'

const stories = {
  title: 'MDX/Video',
  component: Video
}

export default stories

const style = {
  minHeight: '500px'
}

const Template = (args) => (
  <div style={style}>
    <Video src={localVideo} poster={localPoster} {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {}

export const Vimeo = Template.bind({})
Vimeo.args = {
  title: 'Vimeo example',
  vimeoId: '310583077',
  src: '',
  poster: ''
}
