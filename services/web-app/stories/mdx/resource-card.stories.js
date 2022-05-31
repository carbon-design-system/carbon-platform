/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column } from '@carbon/react'
import Image from 'next/image'

import CardGroup from '@/components/card-group'
import ResourceCard from '@/components/resource-card'

const stories = {
  title: 'MDX/ResourceCard',
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
        <Image src="mdx/sketch-icon.png" alt="sketch" />
      </ResourceCard>
    </Column>
    <Column lg={4}>
      <ResourceCard
        subTitle="With subtitle"
        title="Title"
        href="https://www.carbondesignsystem.com"
        {...args}
      >
        <Image src="mdx/sketch-icon.png" alt="sketch" />
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
        <Image src="mdx/sketch-icon.png" alt="sketch" />
      </ResourceCard>
    </Column>
    <Column lg={4}>
      <ResourceCard
        subTitle="With subtitle"
        title="Title"
        href="https://www.carbondesignsystem.com"
        {...args}
      >
        <Image src="mdx/sketch-icon.png" alt="sketch" />
      </ResourceCard>
    </Column>
  </CardGroup>
)

export const Default = Template.bind({})
Default.args = {}
