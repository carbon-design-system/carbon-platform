/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ArtDirection } from '../../../dist/main/index'

export default {
  title: 'Components/Images & Video/ArtDirection',
  component: ArtDirection,
  argTypes: {
    children: {
      control: false
    }
  }
}

const Template = (args) => (
  <div style={{ minHeight: '500px' }}>
    <ArtDirection {...args}>
      <img alt="mobile" src="static/media/src/res/mobile.jpg" />
      <img alt="tablet" src="static/media/src/res/tablet.jpg" />
      <img alt="desktop" src="static/media/src/res/desktop.jpg" />
    </ArtDirection>
  </div>
)

export const Default = Template.bind({})
Default.args = {}
