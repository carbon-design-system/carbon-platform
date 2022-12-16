/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Track, Video } from '../../../dist/main/index'

export default {
  title: 'Components/Images & Video/Track',
  component: Track
}

const Template = (args) => {
  return (
    <Video src="/res/local-video.mp4" poster="/res/local-poster.jpeg">
      <Track kind="captions" default src="/res/hero-video.vtt" srcLang="en" {...args} />
    </Video>
  )
}

export const Default = Template.bind({})
Default.args = {}
