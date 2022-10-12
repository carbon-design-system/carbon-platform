/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column } from '@carbon/react'

import { CardGroup, ResourceCard } from '../../../dist/main/index'
import sketchIconPng from '../../res/sketch-icon.png'

const stories = {
  title: 'Components/ResourceCard',
  component: ResourceCard,
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
  <CardGroup>
    <Column lg={4}>
      <ResourceCard
        subTitle="With subtitle"
        title="Title"
        aspectRatio="2:1"
        actionIcon="arrowRight"
        href="https://www.carbondesignsystem.com"
        {...args}
      >
        <img src={sketchIconPng} alt="sketch" />
      </ResourceCard>
    </Column>
    <Column lg={4}>
      <ResourceCard
        subTitle="With subtitle"
        title="Title"
        href="https://www.carbondesignsystem.com"
        {...args}
      >
        <img src={sketchIconPng} alt="sketch" />
      </ResourceCard>
    </Column>
    <Column lg={4}>
      <ResourceCard
        title="Title"
        aspectRatio="2:1"
        actionIcon="arrowRight"
        href="https://www.carbondesignsystem.com"
        {...args}
      >
        <img src={sketchIconPng} alt="sketch" />
      </ResourceCard>
    </Column>
    <Column lg={4}>
      <ResourceCard
        subTitle="With subtitle"
        title="Title"
        href="https://www.carbondesignsystem.com"
        {...args}
      >
        <img src={sketchIconPng} alt="sketch" />
      </ResourceCard>
    </Column>
  </CardGroup>
)

export const Default = Template.bind({})
Default.args = {}
