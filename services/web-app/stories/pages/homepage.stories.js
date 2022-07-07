/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import HomePage from '@/pages/index.js'

import { pageConfig, PageLayout } from '../../.storybook/layout'

const stories = {
  title: 'Platform/Pages/HomePage',
  component: HomePage,
  ...pageConfig
}

export default stories

const Template = (args) => (
  <PageLayout args={args}>
    <HomePage />
  </PageLayout>
)

export const Default = Template.bind({})
Default.args = {}
