/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Grid } from '@carbon/react'

import { Profile } from '../../../dist/main/index'
import mattRosnoPng from '../../res/rosno_matt.png'

const stories = {
  title: 'Components/Profile',
  component: Profile,
  argTypes: {
    children: {
      control: false
    }
  }
}

export default stories

const Template = (args) => (
  <Grid condensed>
    <Profile name="Matt Rosno" title="Product Manager" {...args}>
      <img
        alt="Use markdown in mdx files. ![Matt Rosno headshot](/rosno_matt.png)"
        src={mattRosnoPng}
      />
    </Profile>
  </Grid>
)

export const Default = Template.bind({})
Default.args = {}
