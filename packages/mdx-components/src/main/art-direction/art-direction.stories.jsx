/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ArtDirection } from '../../../dist/main/index'
import desktop from '../../res/desktop.jpg'
import mobile from '../../res/mobile.jpg'
import tablet from '../../res/tablet.jpg'

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
      <img alt="mobile" src={mobile} />
      <img alt="tablet" src={tablet} />
      <img alt="desktop" src={desktop} />
    </ArtDirection>
  </div>
)

export const Default = Template.bind({})
Default.args = {}
