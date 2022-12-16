/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Track, Video } from '../../../dist/main/index'
import localPoster from '../../res/local-poster.jpeg'
import localVideo from '../../res/local-video.mp4'

export default {
  title: 'Components/Images & Video/Track',
  component: Track
}

// TODOASKJOE: this does not work, why?
const Template = (args) => {
  return (
    <Video src={localVideo} poster={localPoster}>
      <Track
        kind="captions"
        default
        src="static/media/src/res/hero-video.vtt"
        srcLang="en"
        {...args}
      />
    </Video>
  )
}

export const Default = Template.bind({})
Default.args = {}
