/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Column, Grid } from '@carbon/react'

import Divider from '@/components/divider'

const stories = {
  title: 'MDX/Divider',
  component: Divider
}

export default stories

const Template = (args) => (
  <Divider {...args}>
    <Grid>
      <Column sm={4} md={2} lg={4}>
        <h3>
          <strong>v1.0</strong>
        </h3>
        <h2>
          Target release:<div>June</div>
        </h2>
      </Column>
      <Column sm={4} md={6} lg={8}>
        The sites first major release will help system users discover and learn about all the assets
        and libraries in the system with confidence in their completeness, who maintains them, and
        how to use them. System users can access documentation for all indexed assets and libraries
        without leaving the platform. The sites first major release will help system users discover
        and learn about all the assets and libraries in the system with confidence in their
        completeness, who maintains them, and how to use them. System users can access documentation
        for all indexed assets and libraries without leaving the platform.
      </Column>
    </Grid>
  </Divider>
)

export const Default = Template.bind({})
Default.args = {}
