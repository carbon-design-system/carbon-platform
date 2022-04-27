/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Assets from '@/pages/assets/index.js'

import { pageConfig, PageLayout } from '../../.storybook/layout'

const stories = {
  title: 'Platform/Pages/Assets',
  component: Assets,
  ...pageConfig
}

export default stories

const Template = (args) => (
  <PageLayout args={args}>
    <Assets />
  </PageLayout>
)

export const Default = Template.bind({})
Default.args = {}
