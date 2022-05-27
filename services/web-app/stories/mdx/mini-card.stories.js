/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import CardGroup from '@/components/card-group'
import MiniCard from '@/components/mini-card'

const stories = {
  title: 'MDX/MiniCard',
  component: MiniCard,
  parameters: {},
  argTypes: {
    children: {
      control: false
    },
    href: {
      control: false
    },
    actionIcon: {
      control: false
    },
    className: {
      control: false
    },
    linkProps: {
      control: false
    },
    title: {
      control: false
    }
  }
}

export default stories

const Template = (args) => (
  <CardGroup {...args}>
    <MiniCard
      title="Tree view component"
      href="https://carbon-website-git-fork-designertyler-treeview03092020.carbon-design-system.now.sh/components/tree-view/usage"
      actionIcon="arrowRight"
    />
    <MiniCard
      title="Tree view component"
      href="https://carbon-website-git-fork-designertyler-treeview03092020.carbon-design-system.now.sh/components/tree-view/usage"
      actionIcon="email"
    />
    <MiniCard
      title="Tree view component"
      href="https://carbon-website-git-fork-designertyler-treeview03092020.carbon-design-system.now.sh/components/tree-view/usage"
      actionIcon="launch"
    />
    <MiniCard
      title="Tree view component"
      href="https://carbon-website-git-fork-designertyler-treeview03092020.carbon-design-system.now.sh/components/tree-view/usage"
      actionIcon="download"
    />
  </CardGroup>
)

export const Default = Template.bind({})
