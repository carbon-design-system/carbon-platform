/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import MediumPosts from '@/components/medium-posts'

const stories = {
  title: 'MDX/MediumPosts',
  component: MediumPosts,
  argTypes: {
    cardProps: {
      control: false
    }
  }
}

export default stories

const Template = (args) => <MediumPosts {...args} />

export const Default = Template.bind({})
Default.args = {
  postLimit: 3,
  dummy: true
}
