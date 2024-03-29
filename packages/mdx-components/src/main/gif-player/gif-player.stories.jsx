/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { GifPlayer } from '../../../dist/main/index'
import cloudGif from '../../res/cloud.gif'
import cloudJpg from '../../res/cloud.jpg'

const stories = {
  title: 'Components/Images & Video/GifPlayer',
  component: GifPlayer,
  argTypes: {
    children: {
      control: false
    },
    className: {
      control: false
    }
  }
}

export default stories

const Template = (args) => (
  <GifPlayer {...args}>
    <img alt="animated" src={cloudGif} />
    <img alt="static" src={cloudJpg} />
  </GifPlayer>
)

export const Default = Template.bind({})
Default.args = {}
