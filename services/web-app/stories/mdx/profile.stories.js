/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Grid } from '@carbon/react'
import Image from 'next/image'

import Profile from '@/components/profile'

const stories = {
  title: 'MDX/Profile',
  component: Profile
}

export default stories

const Template = (args) => (
  <Grid condensed>
    <Profile name="Matt Rosno" title="Product Manager" {...args}>
      <Image
        alt="Use markdown in mdx files. ![Matt Rosno headshot](/mdx/rosno_matt.png)"
        src="mdx/rosno_matt.png"
      />
    </Profile>
  </Grid>
)

export const Default = Template.bind({})
Default.args = {}
