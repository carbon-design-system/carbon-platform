/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'
import React from 'react'

import ResourceCard from '@/components/resource-card'

const stories = {
  title: 'MDX/ResourceCard',
  component: ResourceCard
}

export default stories

const Template = (args) => (
  <Grid condensed className="resource-card-group">
    <Column lg={4}>
      <ResourceCard
        subTitle="With subtitle"
        title="Title"
        aspectRatio="2:1"
        actionIcon="arrowRight"
        href="https://www.carbondesignsystem.com"
        {...args}
      ></ResourceCard>
    </Column>
    <Column lg={4}>
      <ResourceCard
        subTitle="With subtitle"
        title="Title"
        href="https://www.carbondesignsystem.com"
        {...args}
      ></ResourceCard>
    </Column>
    <Column lg={4}>
      <ResourceCard
        title="Title"
        aspectRatio="2:1"
        actionIcon="arrowRight"
        href="https://www.carbondesignsystem.com"
        {...args}
      ></ResourceCard>
    </Column>
    <Column lg={4}>
      <ResourceCard
        subTitle="With subtitle"
        title="Title"
        href="https://www.carbondesignsystem.com"
        {...args}
      ></ResourceCard>
    </Column>
  </Grid>
)

export const Default = Template.bind({})
Default.args = {}
